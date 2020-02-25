import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { environment } from './../../environments/environment';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request.clone({
      headers: new HttpHeaders({
        observe: 'response',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        Accept: 'aplication/json'
      })
    });

    if (!request.url.match(environment.baseUrl)) {
      return next.handle(request);
    }

    const JWT: any = this.authenticationService.JWTValue;
    if (JWT) {
      request = request.clone({
        headers: new HttpHeaders({
          'x-auth-token': JWT
        })
      });
    } else {
      this.authenticationService.logout();
    }
    return next.handle(request);
  }
}
