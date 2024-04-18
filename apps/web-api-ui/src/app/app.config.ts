import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';
import { ApiModule, Configuration, ConfigurationParameters } from '@web-api-ui/web-api';
import { appRoutes } from './app.routes';

export const config = () => {
  if (isDevMode()) {
    return {
      redirect_uri: location.origin,
      apiUrl: 'http://localhost:5145',
    };
  }
  return {
    redirect_uri: location.origin,
    apiUrl: 'https://webapi-api-app.azurewebsites.net',
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
