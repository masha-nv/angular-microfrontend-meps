import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Beneficiary, BeneficiaryDatabase } from '@org/shared';

@Injectable({
  providedIn: 'root',
})
export class BeneficiaryService {
  private http = inject(HttpClient);

  searchBeneficiary(beneficiaryId: string): Observable<{
    success: boolean;
    beneficiary?: Beneficiary;
    error?: string;
  }> {
    return this.http
      .get<BeneficiaryDatabase>('/assets/beneficiaries.json')
      .pipe(
        map((beneficiaries) => {
          const beneficiary = beneficiaries[beneficiaryId];

          if (beneficiary) {
            return { success: true, beneficiary };
          } else {
            return { success: false, error: 'Beneficiary not found' };
          }
        })
      );
  }

  getAllBeneficiaries(): Observable<BeneficiaryDatabase> {
    return this.http.get<BeneficiaryDatabase>('/assets/beneficiaries.json');
  }

  getBeneficiaryPaymentDetails(beneficiaryId: string): Observable<any> {
    return this.searchBeneficiary(beneficiaryId).pipe(
      map((result) => {
        if (result.success && result.beneficiary) {
          return {
            beneficiary: result.beneficiary,
            paymentDetails: {
              lastPayment: '$1,250.00',
              paymentDate: '2024-01-15',
              nextPayment: '$1,250.00',
              nextPaymentDate: '2024-02-15',
              paymentMethod: 'Direct Deposit',
              accountNumber: '****-****-****-1234',
            },
          };
        }
        return result;
      })
    );
  }
}
