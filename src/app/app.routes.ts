import { Route } from '@angular/router';
import { authGuardFn } from '@auth0/auth0-angular';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginPageComponent } from './login-page/login-page.component';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuardFn],
  },
];
