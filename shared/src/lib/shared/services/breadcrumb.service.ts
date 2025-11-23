import { inject, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, map, tap } from 'rxjs';

type Breadcrumb = {
  label: string;
  url: string;
};

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private _breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);
  breadcrumbs$ = this._breadcrumbs.asObservable();

  router = inject(Router);
  route = inject(ActivatedRoute);

  constructor() {
    this.router.events
      .pipe(
        filter((evt) => evt instanceof NavigationEnd),
        map(() => this.buildBreadcrumbs(this.route))
      )
      .subscribe((breadcrumbs) => this._breadcrumbs.next(breadcrumbs));
  }

  private buildBreadcrumbs(
    route: ActivatedRoute,
    url = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeUrl = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      url += routeUrl ? '/' + routeUrl : '';

      if (child.snapshot.data['breadcrumb']) {
        const label = child.snapshot.data['breadcrumb'];
        breadcrumbs = [...breadcrumbs, { url, label }];
      }
      return this.buildBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }
}
