import { Component, inject, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { BeneficiaryService } from '../services/beneficiary/beneficiary.service';
import { DashboardMenu } from '../dashboard-menu/dashboard-menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
  id = this.route.snapshot.paramMap.get('beneId');
  ngOnInit(): void {
    if (!this.id) return;
    this.beneficiaryService.searchBeneficiary(this.id).subscribe();
  }

  onMenuItemChange(url: string) {
    this.router.navigate([
      'elmo',
      'dashboard',
      this.route.snapshot.paramMap.get('beneId'),
      url,
    ]);
  }
}
