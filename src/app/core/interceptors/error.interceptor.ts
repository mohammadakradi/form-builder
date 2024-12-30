import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    const snackBar = inject(MatSnackBar);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage = 'An unexpected error occurred';

            switch (error.status) {
                case 400:
                    errorMessage = "Check your input";
                    break;
                case 401:
                    errorMessage = "Please log in first";
                    break;
                case 403:
                    errorMessage = "You don't have permission to access this resource";
                    break;
                case 404:
                    errorMessage = "Resource doen't exist";
                    break;
                case 500:
                    errorMessage = "Internal server error, try again later ...";
                    break;
            }

            snackBar.open(errorMessage, 'Close', {
                duration: 3000,
            });

            return throwError(() => error);
        })
    );
};