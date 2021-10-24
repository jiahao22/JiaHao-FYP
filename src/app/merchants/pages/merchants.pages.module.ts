import {NgModule} from '@angular/core';

import {MerchantsPagesRoutingModule} from './merchants.pages.routing.module';
import {MerchantsSharedModule} from '../shared/merchants.shared.module';

import {DashboardComponent} from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    MerchantsPagesRoutingModule,
    MerchantsSharedModule
  ]
})

export class MerchantsPagesModule {

}
