import { BeneficiaryService } from './../services/beneficiary/beneficiary.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute } from '@angular/router';
import { IBeneficiary } from '@org/shared';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-snapshot',
  styleUrls: ['./snapshot.scss'],
  templateUrl: './snapshot.html',
  standalone: true,
  imports: [CommonModule, MatDividerModule],
})
export class Snapshot implements OnInit {
  service = inject(BeneficiaryService);
  route = inject(ActivatedRoute);
  beneId = this.route.snapshot.paramMap.get('beneId');
  selectedBeneficiary$: Observable<IBeneficiary | null> = of(null);

  ngOnInit(): void {
    this.selectedBeneficiary$ = this.service.selectedBeneficiary$;
  }
}
