import { AuthService } from './../../../services/auth/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  errorMessage = '';
  isLoading = false;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  loginForm: FormGroup = this.fb.group({
    userId: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  get userId() {
    return this.loginForm.get('userId');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { userId, password } = this.loginForm.value;

    this.authService.login(userId, password).subscribe({
      next: (result) => {
        this.isLoading = false;
        if (result.success && result.user) {
          // Redirect to preferred application
          const preferredApp = result.user.preferredApplication;
          this.router.navigate([`/${preferredApp}`]);
        } else {
          this.errorMessage = result.error || 'Login failed';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'An error occurred. Please try again.';
        console.error('Login error:', error);
      },
    });
  }
}
