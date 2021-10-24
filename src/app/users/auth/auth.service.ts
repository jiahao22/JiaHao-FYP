import {Injectable} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';

import * as moment from 'moment';
import {Router} from '@angular/router';

export interface userAuthData {
  wallet_address: string;
  access_token: string;
  expired_on: number;
  user_id: string;
  user_email: string;
  user_fullname: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  userAuthData: Subject<userAuthData> = new ReplaySubject<userAuthData>(1);

  constructor(
    private router: Router
  ) {
  }

  public checkUserLoginSession() {
    const userAuthData = localStorage.getItem('userAuthData') !== null ? JSON.parse(localStorage.getItem('userAuthData')) as userAuthData : null;

    if (moment().unix() > userAuthData.expired_on) {
      this.userAuthData.next(null);
      this.router.navigate(['/auth/sign-in']);
      localStorage.removeItem('userAuthData');
      return
    }

    this.userAuthData.next(userAuthData)
  }
}
