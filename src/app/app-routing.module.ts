import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from "./components/index/index.component";
import {LoginComponent} from "./components/login/login.component";
import {LogoutComponent} from "./components/logout/logout.component";
import {CategoryComponent} from "./components/category/category.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";

// GUARDS //
import {
  AuthGuardService as AuthGuard
} from './auth/auth-guard.service';
import {
  RoleGuardService as RoleGuard
} from './auth/role-guard.service';
// // // //

const routes: Routes = [
  {path: '', redirectTo: '/index', pathMatch: 'full'},
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRole: 'USER'
    }
  },
  {
    path: 'admin',
    component: IndexComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRole: 'USER'
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
