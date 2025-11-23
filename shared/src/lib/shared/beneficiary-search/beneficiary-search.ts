import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BeneficiaryService } from '../services/beneficiary.service';

@Component({
  selector: 'lib-beneficiary-search',
  styleUrls: ['./beneficiary-search.scss'],
  templateUrl: './beneficiary-search.html',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
})
export class BeneficiarySearch {
  fb = inject(FormBuilder);
  handleSearch = output<string>();
  searchForm = this.fb.group({
    bene: ['', Validators.required],
  });

  search() {
    const searchValue = this.searchForm.get('bene')?.value;
    if (searchValue) {
      console.log(searchValue);
      this.handleSearch.emit(searchValue);
    }
  }
}
