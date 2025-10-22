import { Component } from '@angular/core';
import { Dashboard } from '../dashboard/dashboard';

@Component({
  imports: [Dashboard],
  selector: 'app-marx-entry',
  template: `<app-dashboard></app-dashboard>`,
})
export class RemoteEntry {}
