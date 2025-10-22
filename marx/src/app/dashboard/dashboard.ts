import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Beneficiary } from '@org/shared';
import { BeneficiaryService } from '../../../services/beneficiary/beneficiary.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  currentUser: any = null;
  selectedBeneficiary: Beneficiary | null = null;
  paymentDetails: any = null;
  errorMessage = '';
  isLoading = false;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private beneficiaryService = inject(BeneficiaryService);

  searchForm = this.fb.group({
    beneficiaryId: ['', [Validators.required, Validators.minLength(3)]],
  });

  ngOnInit() {
    // Get user info from session storage or navigation state
    this.currentUser = history.state?.user || {
      userName: 'Current User',
      role: 'admin',
    };

    // Check for auto-search from query parameters
    this.route.queryParams.subscribe((params) => {
      if (params['beneficiaryId'] && params['autoSearch'] === 'true') {
        // Auto-populate and search
        this.searchForm.patchValue({ beneficiaryId: params['beneficiaryId'] });
        this.onSearch();
      }
    });
  }

  get beneficiaryId() {
    return this.searchForm.get('beneficiaryId');
  }

  onSearch(): void {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.selectedBeneficiary = null;
    this.paymentDetails = null;

    const { beneficiaryId } = this.searchForm.value;

    this.beneficiaryService
      .getBeneficiaryPaymentDetails(beneficiaryId ?? '')
      .subscribe({
        next: (result) => {
          this.isLoading = false;
          if (result.success === false) {
            this.errorMessage = result.error || 'Beneficiary not found';
          } else {
            this.selectedBeneficiary = result.beneficiary;
            this.paymentDetails = result.paymentDetails;
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Error loading beneficiary data';
          console.error('Search error:', error);
        },
      });
  }

  navigateToElmo(): void {
    // Navigate to ELMO with current beneficiary ID for auto-search
    const beneficiaryId = this.selectedBeneficiary?.id || '';
    if (beneficiaryId) {
      // Pass beneficiary ID in URL and state for auto-search
      this.router.navigate(['/elmo'], {
        queryParams: {
          beneficiaryId,
          autoSearch: 'true', // Flag to trigger automatic search
        },
        state: {
          user: this.currentUser,
          fromApplication: 'marx',
        },
      });
    } else {
      // Navigate without beneficiary ID
      this.router.navigate(['/elmo'], {
        state: {
          user: this.currentUser,
          fromApplication: 'marx',
        },
      });
    }
  }

  logout(): void {
    this.router.navigate(['/']);
  }
}
