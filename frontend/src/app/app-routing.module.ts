import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontLayoutComponent } from './layouts/front-layout/front-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

const routes: Routes = [
  {path:'', component: FrontLayoutComponent},
  {path:'admin', component: AdminLayoutComponent, 
    children:[
      {path:'dashboard', loadChildren: ()=>import('./views/admin/dashboard/dashboard.module').then(m=>m.DashboardModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
