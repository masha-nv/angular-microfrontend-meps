import { Route } from '@angular/router';
import { Dashboard } from '../dashboard/dashboard';
import { MarxApp } from '../marx-app/marx-app';
import { BeneSearch } from '../bene-search/bene-search';
import { Snapshot } from '../snapshot/snapshot';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: MarxApp,
    children: [
      {
        path: 'dashboard/:beneId',
        component: Dashboard,
        children: [
          {
            path: 'snapshot',
            component: Snapshot,
          },
        ],
      },
      {
        path: 'search',
        component: BeneSearch,
      },
    ],
  },
];
