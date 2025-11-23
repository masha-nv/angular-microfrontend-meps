import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { BeneficiaryService } from '../../../services/beneficiary/beneficiary.service';
import { filter, map, Observable, of, tap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DashboardMenu } from '../dashboard-menu/dashboard-menu';
import { IMenuItem } from '../../types/menu-item';
import { IBeneficiary } from 'shared/types/beneficiary';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    DashboardMenu,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private beneficiaryService = inject(BeneficiaryService);

  beneficiaryDetails$ = this.beneficiaryService.selectedBeneficiary$;
  id = '';

  ngOnInit() {
    this.route.paramMap.subscribe((params: any) => {
      if (params.params.beneId) {
        this.beneficiaryService
          .searchBeneficiary(params.params.beneId)
          .pipe(
            filter((val) => val.success),
            map((val) => val.beneficiary!),
            tap(() => (this.id = params.params.beneId))
          )
          .subscribe();
      }
    });
  }

  onMenuItemChange(url: string) {
    this.router.navigate(['marx', 'dashboard', this.id, url]);
  }
}
