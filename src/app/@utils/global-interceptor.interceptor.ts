import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthServiceService } from '../component/services/auth-service.service';
import { inject } from '@angular/core';
import { LoaderService } from '../component/services/loaderService.service';
import { SnakbarMessageService } from '../component/shared/snakbarMessage/snakbarService.service';
import { MatDialog } from '@angular/material/dialog';
import { catchError, finalize, throwError } from 'rxjs';
import { SuccessDialogComponent } from '../component/shared/success-dialog/success-dialog.component';
import { CommonServiceService } from '../common/common-service.service';

export const globalInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authS = inject(AuthServiceService);
  const common$ = inject(CommonServiceService);
  const loader = inject(LoaderService);
  const snakBarS = inject(SnakbarMessageService);
  const dialog = inject(MatDialog);
  // show loader
  loader.show();
  // get token
  const token = common$.getToken();
  let authReq = req;
  // 🚀 Skip Cloudinary URLs
  if (req.url.includes('https://api.cloudinary.com')) {
    return next(req);   // <-- no modification
  }
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }
  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => { 
      switch (err.status) {
        case 401:
          const dailogRef = dialog.open(SuccessDialogComponent, {
            width: '500px',
            data: { title: "Unauthorized", message: 'Unauthorized. Please login again.', type:"error" }
          });
          dailogRef.afterClosed().subscribe((res) => {
            localStorage.clear();
            common$.clearToken();
            router.navigate(['/udemy/login']);
          })
          break;
        case 400:
          dialog.open(SuccessDialogComponent, { width: '500px', data: { title: "Bad Request", message: `Something went wrong!`, type:"error" } });
          break;
        case 0:
          dialog.open(SuccessDialogComponent, { width: '500px', data: { title: "Connection Error", message: 'Unable to connect to the server. Please check your internet connection or try again later.', type:"error" } });
          break;
        case 403:
          dialog.open(SuccessDialogComponent, { width: '500px', data: { title: "Unauthorized", message: 'Forbidden Access Denied.', type:"error" } });
          break;
        case 404:
          dialog.open(SuccessDialogComponent, { width: '500px', data: { title: "Not Found", message: "Resource not found.",  type:"warning" } });
          break;
        case 500:
          dialog.open(SuccessDialogComponent, { width: '500px', data: { title: "Internal Server Error", message: "Internal Server Error. Try again later.",  type:"error" } });
          break;
        default:
          dialog.open(SuccessDialogComponent, { width: '500px', data: { title: "Unexpected error", message: "Unexpected error occurred.",  type:"error" } });
          break;
      }
      // if (err.status === 401) {
      //   const dailogRef = dialog.open(SuccessDialogComponent, {
      //     width: '500px',
      //     data: { title: "Not found!", message: 'Something went wrong. Please login again.' }
      //   });
      //   dailogRef.afterClosed().subscribe((res) => {
      //     localStorage.clear();
      //     common$.clearToken();
      //     router.navigate(['/udemy/login']);
      //   })
      // } else if (err.status === 500) {
      //   dialog.open(SuccessDialogComponent, {
      //     width: '500px',
      //     data: { title: "Server error", message: 'Server error, please try again later!' }
      //   });
      // } else if (err.status === 0) {
      //   dialog.open(SuccessDialogComponent, {
      //     width: '500px',
      //     data: { title: "Server error", message: 'Server error, please try again later!' }
      //   });
      // }
      // else {
      //   router.navigate(['/home']);
      // }
      return throwError(() => err);
    }),
    finalize(() => loader.hide())
  );
};
