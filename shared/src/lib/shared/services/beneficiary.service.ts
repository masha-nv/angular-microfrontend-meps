import { Injectable, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BeneficiaryDatabase } from '../../models/beneficiary.interface';
import { IBeneficiary } from '../../../../types/beneficiary';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BeneficiaryService {
  private selectedBeneficiary = new BehaviorSubject<IBeneficiary | null>(null);
  selectedBeneficiary$ = this.selectedBeneficiary.asObservable();

  route = inject(ActivatedRoute);

  private http = inject(HttpClient);

  getAllBeneficiaries(): Observable<BeneficiaryDatabase> {
    return this.http.get<BeneficiaryDatabase>('/assets/beneficiaries.json');
  }

  handleSelectBeneficiary(bene: IBeneficiary) {
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
