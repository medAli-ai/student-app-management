import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontLayoutRoutingModule } from './front-layout-routing.module';
import { FrontLayoutComponent } from './front-layout.component';


@NgModule({
  declarations: [
    FrontLayoutComponent
  ],
  imports: [
    CommonModule,
    FrontLayoutRoutingModule
  ]
})
export class FrontLayoutModule { }
