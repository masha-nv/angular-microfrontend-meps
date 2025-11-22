import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'lib-beneficiary-search',
  styleUrls: ['./beneficiary-search.scss'],
  templateUrl: './beneficiary-search.html',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
})
export class BeneficiarySearch {
  fb = inject(FormBuilder);
  searchForm = this.fb.group({
    bene: ['', Validators.required],
  });
}
