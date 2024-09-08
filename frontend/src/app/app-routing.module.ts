import { Component, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FrontLayoutComponent } from './layouts/front-layout/front-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './views/admin/dashboard/dashboard/dashboard.component';


const routes: Routes = [
  {path:'', component:FrontLayoutComponent},
  {path:'admin', component:AdminLayoutComponent,
    children:[{path:'dashboard', component:DashboardComponent},]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
