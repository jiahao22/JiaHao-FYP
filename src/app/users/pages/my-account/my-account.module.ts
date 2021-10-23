import { NgModule } from '@angular/core';

import { UserSharedModule } from '../../shared/user.shared.module';
import { MyAccountRoutingModule } from './my-account.routing.module';

import { MyAccountComponent } from './my-account.component';
import { ProfileComponent } from './profile/profile.component';
import { AddressesComponent } from './addresses/addresses.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [
    MyAccountComponent,
    ProfileComponent,
    AddressesComponent,
    OrdersComponent,
  ],
  imports: [UserSharedModule, MyAccountRoutingModule],
})
export class MyAccountModule {}
