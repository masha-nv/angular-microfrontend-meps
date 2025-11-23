import { Component, inject, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Breadcrumb, BreadcrumbService, LibBackToolbar } from '@org/shared';
import { BeneficiaryService } from '../../../services/beneficiary/beneficiary.service';

@Component({
  selector: 'app-marx-app',
  styleUrls: ['./marx-app.scss'],
  templateUrl: './marx-app.html',
  imports: [
    RouterModule,
    MatToolbarModule,
    MatTabsModule,
    LibBackToolbar,
    Breadcrumb,
  ],
  standalone: true,
})
export class MarxApp implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  breadcrumbService = inject(BreadcrumbService);
  beneService = inject(BeneficiaryService);

  beneId = '';

  ngOnInit(): void {
    this.beneService.selectedBeneficiary$.subscribe(
      (v) => (this.beneId = v?.beneficiaryId ?? '')
    );
    this.router.navigateByUrl('/marx/beneficiaries/search');
  }
}
