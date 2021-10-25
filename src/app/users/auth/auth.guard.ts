import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService, userAuthData} from './auth.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userAuthService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userAuthData = localStorage.getItem('userAuthData') !== null ? (JSON.parse(localStorage.getItem('userAuthData')) as userAuthData) : null;

    if (userAuthData) {
      // If the token expired.
      if (moment().unix() > userAuthData.expired_on) {
        this.userAuthService.userAuthData.next(null);
        this.router.navigate(['/auth/sign-in']);
        localStorage.removeItem('userAuthData');
        return false;
      }

      this.userAuthService.userAuthData.next(userAuthData);
      return true;
    }

    this.router.navigate(['/auth/sign-in']);
    return false;
  }
}
