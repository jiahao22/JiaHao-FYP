import {NgModule} from '@angular/core';

import {AdminsSharedModule} from '../shared/admins.shared.module';
import {AdminsPagesRoutingModule} from './admins.pages.routing.module';

import {DashboardComponent} from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    AdminsSharedModule,
    AdminsPagesRoutingModule
  ]
})

export class AdminsPagesModule {

}
