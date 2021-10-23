import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { UserSharedModule } from '../shared/user.shared.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'sign-up/:wallet_address',
    component: SignUpComponent,
  },
];

@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [RouterModule.forChild(routes), UserSharedModule],
  providers: [],
})
export class AuthModule {}
