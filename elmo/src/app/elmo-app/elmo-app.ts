import { Component, inject, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LibBackToolbar } from '@org/shared';

@Component({
  selector: 'app-elmo-app',
  styleUrls: ['./elmo-app.scss'],
  templateUrl: './elmo-app.html',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatTabsModule, LibBackToolbar],
})
export class ElmoApp implements OnInit {
  route = inject(ActivatedRoute);
  beneId = '';

  ngOnInit(): void {
    this.beneId = this.route.firstChild?.snapshot.paramMap.get('beneId') ?? '';
  }
}
