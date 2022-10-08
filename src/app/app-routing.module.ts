import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from "./components/index/index.component";
import {LoginComponent} from "./components/login/login.component";

// GUARDS //
import {
  AuthGuardService as AuthGuard
} from './auth/auth-guard.service';
import {
  RoleGuardService as RoleGuard
} from './auth/role-guard.service';
import {LogoutComponent} from "./components/logout/logout.component";
import {CategoryComponent} from "./components/category/category/category.component";
// // // //

const routes: Routes = [
  {path: '', redirectTo: '/index', pathMatch: 'full'},

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'admin',
    component: IndexComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'ADMIN'
    }
  },
  {
    path: 'category/:code',
    component: CategoryComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRole: 'USER'
    }
  },
  {
    path: 'index',
    component: IndexComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRole: 'USER'
    }
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
