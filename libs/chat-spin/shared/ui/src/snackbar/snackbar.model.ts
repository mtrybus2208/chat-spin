import { InjectionToken } from '@angular/core';

export type SnackbarData = {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
};
export const SNACKBAR_DATA = new InjectionToken<SnackbarData>('SNACKBAR_DATA');
