// export interface LoaderInterceptor {
// }
import { Injectable } from '@angular/core';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { LoaderService } from '../classes/loader/loader.service';
import { NotificationService } from '../classes/notification/notification.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  errorMessage: string;
  constructor(private loaderService: LoaderService, private notification: NotificationService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show()

    return next.handle(request).pipe(tap(evt => {
      // custom api errors
      if (evt instanceof HttpResponse) {
        this.loaderService.hide()
        if (evt.body.error == false) {
          this.errorMessage = 'Oops! Something Went Wrong. Please Try Again';
          this.notification.publishMessages(this.errorMessage, 'danger', 1)
        }
      }
    }),

      catchError((error: HttpErrorResponse) => {
        this.loaderService.hide();
        if (error.status === 401) {
          this.notification.publishMessages('Your session has expired. Please Login', 'danger', 1)
          this.router.navigateByUrl("/");
          localStorage.clear();

        }

        if (error.error instanceof ErrorEvent) {
          //client-side error
          this.errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error

          switch (error.status) {
            case 503: {
              this.errorMessage = 'An Internal Error Occured. Our Engineers Have Been Contacted';
              if (error.error['errorDescription']) {
                this.notification.publishMessages(error.error['errorDescription'], 'danger', 1)
              } else {
                this.notification.publishMessages(this.errorMessage, 'danger', 1)
              }
              break;
            }
            case 500: {
              this.errorMessage = 'An Internal Error Occured. Our Engineers Have Been Contacted';
              if (error.error['errorDescription']) {
                this.notification.publishMessages(error.error['errorDescription'], 'danger', 1)
              } else {
                this.notification.publishMessages(this.errorMessage, 'danger', 1)
              }
              break;
            }
            case 400: {
              this.errorMessage = 'An Error Occured While Processing Your Request. Please Try Again';

              if (error.error['errorDescription']) {
                this.notification.publishMessages(error.error['errorDescription'], 'danger', 1)
              } else {
                this.notification.publishMessages(this.errorMessage, 'danger', 1)
              }

              break;
            }
            case 404: {
              this.errorMessage = 'An Error Occured While Processing Your Request. Please Try Again';
              if (error.error['errorDescription']) {
                this.notification.publishMessages(error.error['errorDescription'], 'danger', 1)
              } else {
                this.notification.publishMessages(this.errorMessage, 'danger', 1)
              }
              break;
            }
            case 405: {
              this.errorMessage = 'An Error Occured While Processing Your Request. Please Try Again';
              if (error.error['errorDescription']) {
                this.notification.publishMessages(error.error['errorDescription'], 'danger', 1)
              } else {
                this.notification.publishMessages(this.errorMessage, 'danger', 1)
              }
              break;
            }
            case 422: {
              this.errorMessage = 'An Error Occured While Processing Your Request. Please Try Again';
              if (error.error['errorDescription']) {
                this.notification.publishMessages(error.error['errorDescription'], 'danger', 1)
              } else {
                this.notification.publishMessages(this.errorMessage, 'danger', 1)
              }
              break;
            }
            case 0: {
              this.errorMessage = 'A Connection Error Occured. Please Check Your Network Connection';
              this.notification.publishMessages(this.errorMessage, 'danger', 1)
              break;
            }
          }
        }

        if (error.status === 503 || error.status === 0) {
          return throwError(this.errorMessage);
        }
      })
    );

  }
}
