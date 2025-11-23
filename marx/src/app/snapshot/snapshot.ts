import { BeneficiaryService } from './../../../services/beneficiary/beneficiary.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-snapshot',
  styleUrls: ['./snapshot.scss'],
  templateUrl: './snapshot.html',
  standalone: true,
  imports: [CommonModule],
})
export class Snapshot {
  private beneficiaryService = inject(BeneficiaryService);

  beneficiaryDetails$ = this.beneficiaryService.selectedBeneficiary$;

  constructor() {}
}
