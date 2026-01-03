import { InjectionToken } from '@angular/core';

import { MealsAppConfig } from '../types';

export const MEALS_APP_CONFIG_TOKEN = new InjectionToken<MealsAppConfig>(
  'MEALS_APP_CONFIG_TOKEN'
);
