import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { MEALS_APP_CONFIG_TOKEN } from '@mtrybus/meals/utils-meals';
import { providePrimeNG } from 'primeng/config';
import { environment } from '../environments/environment';
import { appRoutes } from './app.routes';
import { THREE_MEALS_PRIMENG_PRESET } from './primeng-theme.preset';

import { provideAuth } from 'angular-auth-oidc-client';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    providePrimeNG({
      theme: {
        preset: THREE_MEALS_PRIMENG_PRESET,
        options: {
          darkModeSelector: 'none',
        },
      },
    }),
    {
      provide: MEALS_APP_CONFIG_TOKEN,
      useValue: environment,
    },
    provideAuth({
      config: {
        authority: environment.auth.authority,
        redirectUrl: environment.auth.redirectUrl,
        clientId: environment.auth.clientId,
        scope: environment.auth.scope,
        responseType: environment.auth.responseType,
      },
    }),
  ],
};
