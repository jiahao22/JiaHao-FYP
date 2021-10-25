import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import {Observable} from 'rxjs';

import {merchantAuthData, MerchantAuthService} from './merchant.auth.service';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class MerchantAuthGuard implements CanActivate {
  constructor(
    private merchantAuthService: MerchantAuthService,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const merchantAuthData = localStorage.getItem('merchantAuthData') !== null ? (JSON.parse(localStorage.getItem('merchantAuthData')) as merchantAuthData) : null;

    if (merchantAuthData) {
      // If the token expired.
      if (moment().unix() > merchantAuthData.expired_on) {
        this.merchantAuthService.merchantAuthData.next(null)
        this.router.navigate(['/merchant/auth/sign-in']);
        localStorage.removeItem('merchantAuthData');
        return false;
      }

      this.merchantAuthService.merchantAuthData.next(merchantAuthData);
      return true;
    }

    this.router.navigate(['/merchant/auth/sign-in']);
    return false;
  }
}
