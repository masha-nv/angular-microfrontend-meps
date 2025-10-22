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

  searchBeneficiary(
    beneficiaryId: string
  ): Observable<{
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

  // Method to get eligibility details (specific to ELMO)
  getBeneficiaryEligibilityDetails(beneficiaryId: string): Observable<any> {
    return this.searchBeneficiary(beneficiaryId).pipe(
      map((result) => {
        if (result.success && result.beneficiary) {
          // Mock eligibility details - different from MARX payment details
          return {
            success: true,
            beneficiary: result.beneficiary,
            eligibilityDetails: {
              coverageStatus:
                result.beneficiary.status === 'Active'
                  ? 'Eligible'
                  : 'Not Eligible',
              effectiveDate: '2024-01-01',
              expirationDate: '2024-12-31',
              planType: 'Premium Health Plan',
              deductible: '$500.00',
              outOfPocketMax: '$3,000.00',
              copayPrimary: '$25.00',
              copaySpecialist: '$50.00',
              prescriptionCoverage: 'Included',
              networkProviders: '50,000+ providers',
              eligibilityVerified: new Date().toISOString().split('T')[0],
              coverageLevel:
                result.beneficiary.benefits.length > 1
                  ? 'Comprehensive'
                  : 'Basic',
            },
          };
        }
        return { success: false, error: result.error };
      })
    );
  }

  // ELMO-specific method for coverage verification
  verifyCoverage(beneficiaryId: string): Observable<any> {
    return this.searchBeneficiary(beneficiaryId).pipe(
      map((result) => {
        if (result.success && result.beneficiary) {
          return {
            verified: true,
            verificationDate: new Date().toISOString(),
            coverageActive: result.beneficiary.status === 'Active',
            benefits: result.beneficiary.benefits,
          };
        }
        return { verified: false, error: result.error };
      })
    );
  }
}
