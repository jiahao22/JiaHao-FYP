import {NgModule} from '@angular/core';

import {MerchantsComponent} from './merchants.component';

import {UserSharedModule} from '../../shared/user.shared.module';
import {MerchantsRoutingModule} from './merchants.routing.module';

@NgModule({
  declarations: [
    MerchantsComponent
  ],
  imports: [
    UserSharedModule,
    MerchantsRoutingModule
  ]
})

export class MerchantsModule {

}
