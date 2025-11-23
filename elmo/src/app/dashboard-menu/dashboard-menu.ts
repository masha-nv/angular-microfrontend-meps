import { CommonModule } from '@angular/common';
import { Component, OnInit, output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { menuItems } from '../../constants/menu-items';
import { MatDividerModule } from '@angular/material/divider';
import { IMenuItem } from 'shared/types/menu-item';

@Component({
  selector: 'app-dashboard-menu',
  styleUrls: ['./dashboard-menu.scss'],
  templateUrl: './dashboard-menu.html',
  standalone: true,
  imports: [CommonModule, MatListModule, MatDividerModule],
})
export class DashboardMenu implements OnInit {
  items = menuItems;
  activated = menuItems[0];
  itemSelection = output<string>();

  constructor() {
    console.log('DashboardMenu constructor');
  }

  ngOnInit(): void {
    this.handleItemSelect(menuItems[0]);
  }

  handleItemSelect(item: IMenuItem) {
    this.activated = item;
    this.itemSelection.emit(item.key);
  }
}
