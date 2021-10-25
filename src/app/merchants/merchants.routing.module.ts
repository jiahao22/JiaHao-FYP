import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MerchantAuthGuard} from './auth/merchant.auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/merchants.pages.module').then(m => m.MerchantsPagesModule),
        canActivate: [MerchantAuthGuard]
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/merchant.auth.module').then(m => m.MerchantAuthModule)
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class MerchantsRoutingModule {

}
