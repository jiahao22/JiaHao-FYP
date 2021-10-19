import {Injectable} from "@angular/core";
import {ReplaySubject, Subject} from "rxjs";

export interface userAuthData {
  wallet_address: string
}

@Injectable()
export class AuthService {
  userAuthData: Subject<userAuthData> = new ReplaySubject<userAuthData>(1)
  constructor() {
  }
}
