import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { IEligibility } from '../../types/eligibility';
import { IEnrollment } from '../../types/enrollment';
import { IEntitlement } from '../../types/entitlement';
import { BeneficiaryService } from './../../../services/beneficiary/beneficiary.service';
import { MatIconModule } from '@angular/material/icon';

const ENTITLEMENTS: IEntitlement[] = [
  {
    part: 'Part A',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    option: 'Standard',
  },
  {
    part: 'Part B',
    startDate: '2025-03-15',
    endDate: '2026-03-14',
    option: 'Premium',
  },
  {
    part: 'Part C',
    startDate: '2025-06-01',
    endDate: '2025-11-30',
    option: 'Basic',
  },
];

const ELIBILITYS: IEligibility[] = [
  { part: 'Part A', startDate: '2025-03-15', endDate: '2026-03-14' },
];
const ENROLLMENTS: IEnrollment[] = [
  { contract: 'S5884', startDate: '2025-03-15', endDate: '2026-03-14' },
];

@Component({
  selector: 'app-snapshot',
  styleUrls: ['./snapshot.scss'],
  templateUrl: './snapshot.html',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule],
})
export class Snapshot {
  private beneficiaryService = inject(BeneficiaryService);

  beneficiaryDetails$ = this.beneficiaryService.selectedBeneficiary$;

  displayedEntitlementColumns = ['part', 'startDate', 'endDate', 'option'];
  displayedEligibilityColumns = ['part', 'startDate', 'endDate'];
  displayedEnrollmentColumns = ['part', 'startDate', 'endDate'];
  dataSourceEntitlement = ENTITLEMENTS;
  dataSourceEligibility = ELIBILITYS;
  dataSourceEnrollment = ENROLLMENTS;
}
