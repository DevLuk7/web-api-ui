import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';
import { ApiModule, Configuration, ConfigurationParameters } from './api';
import { appRoutes } from './app.routes';

const config = () => {
  if (isDevMode()) {
    return {
      redirect_uri: location.origin,
      apiUrl: 'http://localhost:5145',
    };
  }
  return {
    redirect_uri: 'https://black-desert-02f949510.5.azurestaticapps.net',
    apiUrl: 'https://webapi-api.azure-api.net',
  };
};

export const appConfig: ApplicationConfig = {
  providers: [
    // provideClientHydration(),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([authHttpInterceptorFn])),
    provideAnimationsAsync(),
    provideAuth0({
      domain: 'dev-q70qohzvtsuc0rmo.us.auth0.com',
      clientId: 'K3NxUUmC9ddETdtCXgcwmf30KffvBC1d',
      authorizationParams: {
        redirect_uri: config().redirect_uri,
        audience: config().apiUrl,
      },
      httpInterceptor: {
        allowedList: [`${config().apiUrl}/*`],
      },
    }),
    importProvidersFrom(
      ApiModule.forRoot(() => {
        const params: ConfigurationParameters = {
          basePath: config().apiUrl,
        };
        return new Configuration(params);
      })
    ),
  ],
};
