import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {userAuthData} from './users/auth/auth.service';

@Injectable({providedIn: 'root'})

export class RequestHttpInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const module = request.url.split('/')[4]

    if (module === 'user') {
      const userAuthData = localStorage.getItem('userAuthData') !== null ? (JSON.parse(localStorage.getItem('userAuthData'))) as userAuthData : null;
      if (userAuthData) {
        const modifiedRequest = request.clone({
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userAuthData.access_token
          })
        })
        return next.handle(modifiedRequest);
      }
    }

    return next.handle(request.clone())
  }

}
