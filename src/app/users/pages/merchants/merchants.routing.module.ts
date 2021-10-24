import {RouterModule, Routes} from '@angular/router';
import {MerchantsComponent} from './merchants.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MerchantsComponent
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
