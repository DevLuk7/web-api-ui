import { DATE_PIPE_DEFAULT_OPTIONS, isPlatformBrowser } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, InjectionToken, PLATFORM_ID, isDevMode } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

export const config = () => {
  if (isDevMode()) {
    return {
      cmsUrl: 'http://localhost:1337',
      appUrl: 'http://localhost:4000',
      googleAnalyticsId: '',
    };
  }
  return {
    cmsUrl: 'https://cms.devluk.io',
    appUrl: 'https://devluk.io',
    googleAnalyticsId: 'G-YCY2WNBF7W',
  };
};

export const WINDOW = new InjectionToken<Window & { gtag: (...args: unknown[]) => void }>('Window');

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
    {
      provide: WINDOW,
      useFactory: (platformId: any) => {
        if (isPlatformBrowser(platformId)) {
          return window;
        }
        return {};
      },
      deps: [PLATFORM_ID],
    },
  ],
};
