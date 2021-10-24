import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SignInComponent} from './sign-in/sign-in.component';

import {AdminsSharedModule} from '../shared/admins.shared.module';


const routes: Routes = [
  {
    path: '',
    component: SignInComponent
  }
]

@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    AdminsSharedModule
  ]
})

export class AdminsAuthModule {

}
