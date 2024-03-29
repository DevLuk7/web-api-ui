import { Route } from '@angular/router';
import { authGuardFn } from '@auth0/auth0-angular';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';

export const appRoutes: Route[] = [
  {
    path: '',
    canActivate: [authGuardFn],
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'create',
        component: CreateComponent,
      },
    ],
  },
];
