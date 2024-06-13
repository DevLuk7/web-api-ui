import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

export const config = () => {
  if (isDevMode()) {
    return {
      cmsUrl: 'http://localhost:1337',
      appUrl: 'http://localhost:4000',
    };
  }
  return {
    cmsUrl: 'https://cms.devluk.io',
    appUrl: 'https://devluk.io',
  };
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideRouter(appRoutes),
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: {
        dateFormat: 'dd MMMM YYYY',
      },
    },
  ],
};
