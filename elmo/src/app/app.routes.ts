import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard').then((m) => m.Dashboard),
  },
];
