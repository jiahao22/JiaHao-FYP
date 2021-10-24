import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';

import {NgxSpinnerModule} from 'ngx-spinner';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NgxSpinnerModule
  ]
})

export class AdminsSharedModule {

}
