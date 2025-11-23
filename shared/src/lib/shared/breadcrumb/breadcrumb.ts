import { CommonModule } from '@angular/common';
import { BreadcrumbService } from '../services/breadcrumb.service';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-breadcrumb',
  styleUrls: ['./breadcrumb.scss'],
  templateUrl: './breadcrumb.html',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, MatIconModule],
})
export class Breadcrumb {
  service = inject(BreadcrumbService);
  breadcrumbs$ = this.service.breadcrumbs$;
}
