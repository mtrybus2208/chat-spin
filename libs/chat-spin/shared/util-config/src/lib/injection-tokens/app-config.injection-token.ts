import { InjectionToken } from '@angular/core';

import { EnvironmentConfig } from '../types';

export const APP_CONFIG = new InjectionToken<EnvironmentConfig>('APP_CONFIG');
