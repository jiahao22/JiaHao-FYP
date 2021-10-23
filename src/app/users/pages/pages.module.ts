import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages.routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserSharedModule } from '../shared/user.shared.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [PagesRoutingModule, UserSharedModule],
})
export class PagesModule {}
