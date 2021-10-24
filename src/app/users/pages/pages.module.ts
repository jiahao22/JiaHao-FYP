import {NgModule} from '@angular/core';

import {PagesRoutingModule} from './pages.routing.module';

import {UserSharedModule} from '../shared/user.shared.module';
import {AboutUsComponent} from './about-us/about-us.component';
import {PricingComponent} from './pricing/pricing.component';
import {HomeComponent} from './home/home.component';

@NgModule({
  declarations: [
    HomeComponent,
    AboutUsComponent,
    PricingComponent
  ],
  imports: [PagesRoutingModule, UserSharedModule],
})
export class PagesModule {
}
