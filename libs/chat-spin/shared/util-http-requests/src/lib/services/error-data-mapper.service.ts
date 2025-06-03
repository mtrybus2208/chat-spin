import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseErrorResponse } from '../interfaces';

export const ERROR_MESSAGES = {
  internalServerError: 'Internal server error occurred',
  defaultError: 'An error occurred while processing your request',
  errorHeader: 'Error',
} as const;

@Injectable({
  providedIn: 'root',
})
export class ErrorDataMapperService {
  getErrorMessage(errorResponse: HttpErrorResponse): string {
    if (
      !errorResponse.status ||
      !errorResponse.error ||
      !errorResponse.error.errors
    ) {
      return this.getDefaultErrorMessage();
    }

    const errorValue = errorResponse.error as BaseErrorResponse;

    if (errorResponse.status === HttpStatusCode.InternalServerError) {
      return ERROR_MESSAGES.internalServerError;
    }

    if (errorValue?.errors) {
      return this.mapErrorMessages(errorValue);
    }

    return this.getDefaultErrorMessage();
  }

  private getDefaultErrorMessage(): string {
    return ERROR_MESSAGES.defaultError;
  }

  private mapErrorMessages(errorValue: BaseErrorResponse): string {
    const allErrorMessages = Object.values(errorValue.errors).flat();

    if (allErrorMessages.length) {
      return ` ${allErrorMessages
        .map((message) => `<p>${message}</p>`)
        .join('')}`;
    }

    return this.getDefaultErrorMessage();
  }
}
