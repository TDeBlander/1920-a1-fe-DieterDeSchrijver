import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { AuthenticationService } from '../admin/authentication.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.token.length) {
      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization',`Bearer ${this.authService.token.slice(1, -1)}`)
      });
      return next.handle(clonedRequest);
    }
    return next.handle(req);
  }
}