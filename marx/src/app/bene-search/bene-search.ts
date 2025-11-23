import { Component, inject, OnInit } from '@angular/core';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { LibBackToolbar, BeneficiarySearch } from '@org/shared';
import { BeneficiaryService } from '../../../services/beneficiary/beneficiary.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-bene-search',
  templateUrl: './bene-search.html',
  styleUrls: ['./bene-search.scss'],
  standalone: true,
  imports: [BeneficiarySearch],
})
export class BeneSearch {
  beneService = inject(BeneficiaryService);
  router = inject(Router);

  search(bene: string) {
    this.beneService
      .searchBeneficiary(bene)
      .pipe(
        tap((val) => {
          if (val.success) {
            this.router.navigate(['marx', 'dashboard', bene]);
          }
        })
      )
      .subscribe();
  }
}
