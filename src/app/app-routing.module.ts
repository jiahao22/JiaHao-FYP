import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./users/pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./users/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'merchant',
    loadChildren: () => import('./merchants/merchants.module').then(m => m.MerchantsModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admins/admins.module').then(m => m.AdminsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
