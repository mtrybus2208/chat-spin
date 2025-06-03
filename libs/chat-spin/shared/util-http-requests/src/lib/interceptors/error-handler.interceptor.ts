import {
  HttpContextToken,
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { ErrorDataMapperService } from '../services/error-data-mapper.service';

import { SnackbarService } from '@mtrybus/ui';
import { catchError, Observable, retry, throwError } from 'rxjs';

export const SKIP_ERROR_HANDLER = new HttpContextToken<boolean>(() => false);

export function errorHandlerInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const snackbarService = inject(SnackbarService);
  const errorDataMapperService = inject(ErrorDataMapperService);

  if (req.context.get(SKIP_ERROR_HANDLER)) {
    return next(req).pipe(retry(2));
  }

  return next(req).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      const message = errorDataMapperService.getErrorMessage(error);

      snackbarService.openSnackbar({
        message,
        type: 'error',
      });
      return throwError(() => error);
    })
  );
}
