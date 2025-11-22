import { AuthService } from './../../services/auth/auth.service';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  imports: [
    RouterModule,
    MatToolbar,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    CommonModule,
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  authService = inject(AuthService);
  router = inject(Router);
  protected title = 'meps';

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
