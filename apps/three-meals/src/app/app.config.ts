import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import { THREE_MEALS_PRIMENG_PRESET } from './primeng-theme.preset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    providePrimeNG({
      theme: {
        preset: THREE_MEALS_PRIMENG_PRESET,
        // PrimeUIX domyślnie przełącza na dark wg systemu (`system`).
        // Jeśli masz system w dark-mode, datepicker/overlaye będą wyglądały "czarno".
        // Wymuszamy light scheme dla tej aplikacji.
        options: {
          darkModeSelector: 'none',
        },
      },
    }),
  ],
};
