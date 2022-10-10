import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {TokenService} from "./token.service";
import {ActivatedRouteSnapshot, Router} from "@angular/router";
import decode, {JwtPayload} from 'jwt-decode';
import {UserService} from "../services/user/user.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  constructor(public auth: AuthService, public router: Router, public tokenService: TokenService, public userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if(this.userService.getCurrentUser() === undefined) return false;
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data['expectedRole'];
    // decode the token to get its payload
    const tokenPayload: any = decode(this.tokenService.getToken());
    if (
      !this.auth.isAuthenticated() ||
      (tokenPayload.user.role as string) === (expectedRole)
    ) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
