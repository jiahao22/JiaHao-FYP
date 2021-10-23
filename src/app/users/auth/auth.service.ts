import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

export interface userAuthData {
  wallet_address: string;
  access_token: string;
  expired_on: number;
  user_id: string;
  user_email: string;
  user_fullname: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  userAuthData: Subject<userAuthData> = new ReplaySubject<userAuthData>(1);
  constructor() {}
}
