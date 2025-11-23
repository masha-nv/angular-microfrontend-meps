import { Route } from '@angular/router';
import { Dashboard } from '../dashboard/dashboard';
import { ElmoApp } from '../elmo-app/elmo-app';
import { Snapshot } from '../snapshot/snapshot';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: ElmoApp,
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
    ],
  },
];
