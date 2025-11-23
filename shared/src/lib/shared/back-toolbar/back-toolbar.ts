import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, RouterModule],
  selector: 'lib-back-toolbar',
  styleUrls: ['./back-toolbar.scss'],
  templateUrl: './back-toolbar.html',
})
export class LibBackToolbar implements OnInit {
  url = input.required();
  urlLabel = input.required();
  backgroundColor = '';
  position: 'left' | 'right' = 'left';
  route = inject(ActivatedRoute);
  beneId = '';
  routerLink = '';
  ngOnInit(): void {
    this.beneId = this.route.snapshot.paramMap.get('beneId') ?? '';
  }
}
