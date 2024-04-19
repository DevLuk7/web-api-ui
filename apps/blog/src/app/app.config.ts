import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { ApiModule, Configuration, ConfigurationParameters } from '@web-api-ui/web-api';
import { appRoutes } from './app.routes';

export const config = () => {
  if (isDevMode()) {
    return {
      apiUrl: 'http://localhost:5145',
    };
  }
  return {
    apiUrl: 'https://webapi-api-app.azurewebsites.net',
  };
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideRouter(appRoutes),
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
