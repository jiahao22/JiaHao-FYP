import {NgModule} from '@angular/core';

import {AdminsRoutingModule} from './admins.routing.module';
import {AdminsAuthService} from './auth/admins.auth.service';
import {AdminsAuthGuard} from './auth/admins.auth.guard';

@NgModule({
  declarations: [],
  imports: [
    AdminsRoutingModule
  ],
  providers: [
    AdminsAuthService,
    AdminsAuthGuard
  ]
})

export class AdminsModule {

}
