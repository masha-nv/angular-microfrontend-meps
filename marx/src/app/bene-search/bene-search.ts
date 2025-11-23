import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BeneficiarySearch } from '@org/shared';
import { tap } from 'rxjs';
import { BeneficiaryService } from '../../../services/beneficiary/beneficiary.service';

@Component({
  selector: 'app-bene-search',
  templateUrl: './bene-search.html',
  styleUrls: ['./bene-search.scss'],
  standalone: true,
  imports: [BeneficiarySearch, RouterModule],
})
export class BeneSearch {
  beneService = inject(BeneficiaryService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  search(bene: string) {
    this.beneService
      .searchBeneficiary(bene)
      .pipe(
        tap((val) => {
          if (val.success) {
            this.router.navigate([
              'marx',
              'beneficiaries',
              'search',
              bene,
              'snapshot',
            ]);
          }
        })
      )
      .subscribe();
  }
}
