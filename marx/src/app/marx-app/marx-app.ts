import { Component, inject, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LibBackToolbar } from '@org/shared';
import { BeneficiaryService } from '../../../services/beneficiary/beneficiary.service';

@Component({
  selector: 'app-marx-app',
  styleUrls: ['./marx-app.scss'],
  templateUrl: './marx-app.html',
  imports: [RouterModule, MatToolbarModule, MatTabsModule, LibBackToolbar],
  standalone: true,
})
export class MarxApp implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  beneService = inject(BeneficiaryService);

  beneId = '';

  ngOnInit(): void {
    this.beneService.selectedBeneficiary$.subscribe(
      (v) => (this.beneId = v?.beneficiaryId ?? '')
    );
  }
}
