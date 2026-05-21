import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ApiErrorService } from '../services/api-error.service';

export const apiErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const errors = inject(ApiErrorService);

  return next(request).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        const message = error.status === 0
          ? 'The museum archive is unreachable right now.'
          : `The Met API returned ${error.status}.`;
        errors.set(message);
      }

      return throwError(() => error);
    })
  );
};
