import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dashboard } from './dashboard';
import { IMenuItem } from 'shared/types/menu-item';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the first menu item activated', () => {
    expect(component.activated).toBeTruthy();
    expect(component.items && component.items.length).toBeGreaterThan(0);
    if (component.items && component.items.length > 0) {
      expect(component.activated).toEqual(component.items[0]);
    }
  });

  it('should update activated item on handleItemSelect', () => {
    const newItem: IMenuItem = { label: 'Test', key: 'test', url: '/test' };
    component.handleItemSelect(newItem);
    expect(component.activated).toEqual(newItem);
  });

  it('should emit itemSelection with selected item key on handleItemSelect', () => {
    const newItem: IMenuItem = { label: 'Emit', key: 'emit-key', url: '/emit' };
    const emitSpy = jest.spyOn(component.itemSelection, 'emit');
    component.handleItemSelect(newItem);
    expect(emitSpy).toHaveBeenCalledWith('emit-key');
  });

  it('should log on init', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    component.ngOnInit();
    expect(logSpy).toHaveBeenCalledWith('ELMO DASHBOARD');
    logSpy.mockRestore();
  });

  it('should log and update state when selecting an item', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const item: IMenuItem = { label: 'Select', key: 'sel', url: '/sel' };
    component.handleItemSelect(item);
    expect(logSpy).toHaveBeenCalledWith('DashboardMenu handleItemSelect', item);
    expect(component.activated).toEqual(item);
    logSpy.mockRestore();
  });
});
