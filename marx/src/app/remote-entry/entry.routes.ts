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
        path: 'beneficiaries',
        data: { breadcrumb: 'Beneficiaries' },
        children: [
          {
            path: 'search',
            component: BeneSearch,
            data: { breadcrumb: 'Search', url: 'marx/beneficiaries/search' },
            children: [
              {
                path: ':beneId',
                component: Dashboard,
                children: [
                  {
                    path: 'snapshot',
                    component: Snapshot,
                    data: { breadcrumb: 'Snapshot' },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
