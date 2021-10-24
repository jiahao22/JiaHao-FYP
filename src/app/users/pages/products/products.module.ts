import {NgModule} from '@angular/core';

import {ProductsComponent} from './products.component';

import {UserSharedModule} from '../../shared/user.shared.module';
import {ProductsRoutingModule} from './products.routing.module';

@NgModule({
  declarations: [
    ProductsComponent,
  ],
  imports: [
    UserSharedModule,
    ProductsRoutingModule
  ]
})

export class ProductsModule {

}
