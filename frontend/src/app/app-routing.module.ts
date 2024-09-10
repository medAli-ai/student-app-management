import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FrontLayoutComponent } from './layouts/front-layout/front-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';


const routes: Routes = [
  {path:'', component: FrontLayoutComponent,
    children:[
      {path:'', loadChildren: () => import('./views/front/home/home.module').then(m => m.HomeModule)},
      {path:'loginuser', loadChildren: () => import('./views/front/loginuser/loginuser.module').then(m => m.LoginuserModule)},
      {path:'register', loadChildren: () => import('./views/front/register/register.module').then(m => m.RegisterModule)}
    ]
  },
  {path:'admin', component: AdminLayoutComponent, 
    children:[
      {path:'dashboard', loadChildren: () => import('./views/admin/dashboard/dashboard.module').then(m => m.DashboardModule)},
      {path:'login', loadChildren: () => import('./views/admin/loginadmin/loginadmin.module').then(m => m.LoginadminModule)}
    ]
  },
  {    path: '',    redirectTo: '',    pathMatch: 'full'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
