import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';

import {MerchantsSharedModule} from '../shared/merchants.shared.module';
import {ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'sign-in'
      },
      {
        path: 'sign-in',
        component: SignInComponent
      },
      {
        path: 'sign-up',
        component: SignUpComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    MerchantsSharedModule,
    ReactiveFormsModule
  ]
})
export class MerchantAuthModule {

}
