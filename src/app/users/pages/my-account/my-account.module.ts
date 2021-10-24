import {NgModule} from '@angular/core';

import {UserSharedModule} from '../../shared/user.shared.module';
import {MyAccountRoutingModule} from './my-account.routing.module';

import {MyAccountComponent} from './my-account.component';
import {ProfileComponent} from './profile/profile.component';
import {AddressesComponent} from './addresses/addresses.component';
import {OrdersComponent} from './orders/orders.component';
import {AddAddressComponent} from './addresses/add-address/add-address.component';
import {EditAddressComponent} from './addresses/edit-address/edit-address.component';

import {DataTablesModule} from 'angular-datatables';


@NgModule({
  declarations: [
    MyAccountComponent,
    ProfileComponent,
    AddressesComponent,
    OrdersComponent,
    AddAddressComponent,
    EditAddressComponent
  ],
  imports: [
    UserSharedModule,
    MyAccountRoutingModule,
    DataTablesModule
  ],
})
export class MyAccountModule {
}
