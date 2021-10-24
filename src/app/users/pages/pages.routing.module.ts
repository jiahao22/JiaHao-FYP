import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth/auth.guard';

import {AboutUsComponent} from './about-us/about-us.component';
import {PricingComponent} from './pricing/pricing.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'my-account',
        loadChildren: () => import('./my-account/my-account.module').then((m) => m.MyAccountModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'products',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'merchants',
        loadChildren: () => import('./merchants/merchants.module').then(m => m.MerchantsModule)
      },
      {
        path: 'about-us',
        component: AboutUsComponent
      },
      {
        path: 'pricing',
        component: PricingComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
