import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'loginadmin', loadChildren: () => import('./loginadmin/loginadmin.module').then(m => m.LoginadminModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginadminRoutingModule { }
