import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IBeneficiary } from '@org/shared';
import { BeneficiaryService } from '../services/beneficiary/beneficiary.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  currentUser: any = null;
  selectedBeneficiary: IBeneficiary | null = null;
  eligibilityDetails: any = null;
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
    this.eligibilityDetails = null;

    const { beneficiaryId } = this.searchForm.value;

    this.beneficiaryService
      .getBeneficiaryEligibilityDetails(beneficiaryId ?? '')
      .subscribe({
        next: (result) => {
          this.isLoading = false;
          if (result.success === false) {
            this.errorMessage = result.error || 'Beneficiary not found';
          } else {
            this.selectedBeneficiary = result.beneficiary;
            this.eligibilityDetails = result.eligibilityDetails;
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Error loading beneficiary data';
          console.error('Search error:', error);
        },
      });
  }

  navigateToMarx(): void {
    // Navigate to MARX with current beneficiary ID for auto-search
    const beneficiaryId = this.selectedBeneficiary?.beneficiaryId || '';
    if (beneficiaryId) {
      this.router.navigate(['/marx'], {
        queryParams: {
          beneficiaryId,
          autoSearch: 'true',
        },
        state: {
          user: this.currentUser,
          fromApplication: 'elmo',
        },
      });
    } else {
      this.router.navigate(['/marx'], {
        state: {
          user: this.currentUser,
          fromApplication: 'elmo',
        },
      });
    }
  }

  logout(): void {
    this.router.navigate(['/']);
  }
}
