import {Injectable} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';

export interface merchantAuthData {
  access_token: string
  expired_on: number
  merchant_email: string
  merchant_id: number
  merchant_phone_number: string
  merchant_shop_name: string
  wallet_address: string
}


@Injectable()


export class MerchantAuthService {
  merchantAuthData: Subject<merchantAuthData> = new ReplaySubject<merchantAuthData>(1)
  constructor() {
  }
}
