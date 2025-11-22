import { LibBackToolbar } from '@org/shared';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { Component } from '@angular/core';
import { Dashboard } from '../dashboard/dashboard';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { BeneficiarySearch } from '@org/shared';

@Component({
  imports: [
    CommonModule,
    RouterModule,
    Dashboard,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    LibBackToolbar,
    BeneficiarySearch,
  ],
  standalone: true,
  selector: 'app-marx-entry',
  templateUrl: './entry.html',
  styleUrls: ['./entry.scss'],
})
export class RemoteEntry {}
