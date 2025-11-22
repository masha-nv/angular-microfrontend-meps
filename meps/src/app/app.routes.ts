import { Login } from './login/login';
import { Route } from '@angular/router';
import { UserAccount } from './user-account/user-account';
import { Help } from './help/help';

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
  {
    path: 'user/:username',
    component: UserAccount,
  },
  {
    path: 'help',
    component: Help,
  },
];
