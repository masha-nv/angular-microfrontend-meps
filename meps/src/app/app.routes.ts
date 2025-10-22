import { Login } from './login/login';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'marx',
    loadChildren: () => import('marx/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'elmo',
    loadChildren: () => import('elmo/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: '',
    component: Login,
  },
];
