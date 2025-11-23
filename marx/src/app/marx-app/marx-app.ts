import { Component, inject, OnInit } from '@angular/core';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import {
  LibBackToolbar,
  BeneficiarySearch,
  BeneficiaryService,
} from '@org/shared';
import { tap } from 'rxjs';

@Component({
  selector: 'app-marx-app',
  styleUrls: ['./marx-app.scss'],
  templateUrl: './marx-app.html',
  imports: [
    RouterModule,
    MatToolbarModule,
    MatTabsModule,
    LibBackToolbar,
    BeneficiarySearch,
  ],
  standalone: true,
})
export class MarxApp implements OnInit {
  router = inject(Router);

  ngOnInit(): void {
    this.router.navigate(['marx', 'search']);
  }
}
