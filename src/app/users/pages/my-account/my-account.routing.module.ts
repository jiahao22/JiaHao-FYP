import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AddressesComponent} from './addresses/addresses.component';
import {MyAccountComponent} from './my-account.component';
import {OrderDetailComponent} from './orders/order-detail/order-detail.component';
import {OrdersComponent} from './orders/orders.component';
import {ProfileComponent} from './profile/profile.component';
import {AddAddressComponent} from './addresses/add-address/add-address.component';
import {EditAddressComponent} from './addresses/edit-address/edit-address.component';

const routes: Routes = [
  {
    path: '',
    component: MyAccountComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: '',
            redirectTo: 'profile',
          },
          {
            path: 'profile',
            component: ProfileComponent,
          },
          {
            path: 'addresses',
            children: [
              {
                path: '',
                component: AddressesComponent,
              },
              {
                path: 'add-address',
                component: AddAddressComponent
              },
              {
                path: 'edit-address/:address_id',
                component: EditAddressComponent
              }
            ]
          },
          {
            path: 'orders',
            children: [
              {
                path: '',
                component: OrdersComponent,
              },
              {
                path: ':order_id',
                component: OrderDetailComponent,
              },
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAccountRoutingModule {
}
