import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'loginuser', loadChildren: () => import('./loginuser/loginuser.module').then(m => m.LoginuserModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginuserRoutingModule { }
