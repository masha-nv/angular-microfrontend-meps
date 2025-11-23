import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BeneficiaryDatabase, IBeneficiary } from '@org/shared';

@Injectable({
  providedIn: 'root',
})
export class BeneficiaryService {
  private selectedBeneficiary = new BehaviorSubject<IBeneficiary | null>(null);
  selectedBeneficiary$ = this.selectedBeneficiary.asObservable();

  private http = inject(HttpClient);

  getAllBeneficiaries(): Observable<BeneficiaryDatabase> {
    return this.http.get<BeneficiaryDatabase>('/assets/beneficiaries.json');
  }

  handleSelectBeneficiary(bene: IBeneficiary) {
    console.log('service bene', bene);
    this.selectedBeneficiary.next(bene);
  }

  searchBeneficiary(beneficiaryId: string): Observable<{
    success: boolean;
    beneficiary?: IBeneficiary;
    error?: string;
  }> {
    return this.http
      .get<BeneficiaryDatabase>('/assets/beneficiaries.json')
      .pipe(
        map((beneficiaries) => {
          const beneficiary = beneficiaries[beneficiaryId];
          console.log('found', beneficiaries);
          if (beneficiary) {
            this.handleSelectBeneficiary(beneficiary);
            return { success: true, beneficiary };
          } else {
            return { success: false, error: 'Beneficiary not found' };
          }
        })
      );
  }
}
