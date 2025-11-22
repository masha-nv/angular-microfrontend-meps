import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';

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

  ngOnInit(): void {
    console.log('URL', this.url);
  }
}
