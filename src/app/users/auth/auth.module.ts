import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';

import {SignInComponent} from './sign-in/sign-in.component';

import { AuthGuard } from './auth.guard';
import {AuthService} from './auth.service';

import {NgxSpinnerModule} from 'ngx-spinner';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
  },
  {
    path: 'auth',
    children: [
      {
        path: '',
        redirectTo: 'sign-in'
      },
      {
        path: 'sign-in',
        component: SignInComponent
      },
    ]
  },

]

@NgModule({
  declarations: [
    SignInComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxSpinnerModule,
    FormsModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class AuthModule {

}
