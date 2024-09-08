import { Component, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FrontLayoutComponent } from './layouts/front-layout/front-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './views/admin/dashboard/dashboard/dashboard.component';
import { LoginadminComponent } from './views/admin/loginadmin/loginadmin/loginadmin.component';
import { HomeComponent } from './views/front/home/home/home.component';
import { LoginuserComponent } from './views/front/loginuser/loginuser/loginuser.component';


const routes: Routes = [
  {path:'', component:FrontLayoutComponent, children:[
    {path:'', component:HomeComponent},
    {path:'loginuser', component:LoginuserComponent}
  ]},
  {path:'admin', component:AdminLayoutComponent,
    children:[
      {path:'dashboard', component:DashboardComponent},
      {path:'loginadmin', component:LoginadminComponent} ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
