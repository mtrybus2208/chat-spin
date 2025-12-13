import {
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { provideLottieOptions } from 'ngx-lottie';

import { APP_CONFIG } from '@mtrybus/util-config';
import { errorHandlerInterceptor } from '@mtrybus/util-http-requests';

import { environment } from '../environments/environment';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([errorHandlerInterceptor])
    ),
    provideLottieOptions({
      player: () => import('lottie-web'),
    }),
    {
      provide: APP_CONFIG,
      useValue: environment,
    },
  ],
};
