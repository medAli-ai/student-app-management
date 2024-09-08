import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'admin-layout', loadChildren: () => import('./admin-layout/admin-layout.module').then(m => m.AdminLayoutModule) },
   { path: 'front-layout', loadChildren: () => import('./front-layout/front-layout.module').then(m => m.FrontLayoutModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
