import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/admins.pages.module').then(m => m.AdminsPagesModule)
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/admins.auth.module').then(m => m.AdminsAuthModule)
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

export class AdminsRoutingModule {

}
