import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { ApiModule, Configuration, ConfigurationParameters } from '@web-api-ui/web-api';
import { appRoutes } from './app.routes';

export const config = () => {
  if (isDevMode()) {
    return {
      apiUrl: 'http://localhost:3333',
      cmsUrl: 'http://localhost:1337',
    };
  }
  return {
    apiUrl: 'https://api.devluk.io',
    cmsUrl: 'http://devluk-cms-env.eba-kyq3tkft.eu-north-1.elasticbeanstalk.com',
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
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: {
        dateFormat: 'dd MMMM YYYY',
      },
    },
  ],
};
