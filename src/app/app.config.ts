import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([authHttpInterceptorFn])),
    provideAnimationsAsync(),
    provideAuth0({
      domain: 'dev-q70qohzvtsuc0rmo.us.auth0.com',
      clientId: 'K3NxUUmC9ddETdtCXgcwmf30KffvBC1d',
      authorizationParams: {
        redirect_uri: 'http://localhost:4200',
        audience: 'http://localhost:5145',
      },
      httpInterceptor: {
        allowedList: [`http://localhost:5145/*`],
      },
    }),
  ],
};
