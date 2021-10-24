import {NgModule} from '@angular/core';

import {MerchantsRoutingModule} from './merchants.routing.module';
import {MerchantAuthService} from './auth/merchant.auth.service';
import {MerchantAuthGuard} from './auth/merchant.auth.guard';


@NgModule({
  declarations: [],
  imports: [
    MerchantsRoutingModule
  ],
  providers: [
    MerchantAuthService,
    MerchantAuthGuard
  ]
})

export class MerchantsModule {

}
