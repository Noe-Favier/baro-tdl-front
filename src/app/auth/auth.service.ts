import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {TokenService} from "./token.service";
import {UserService} from "../services/user/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService, public tokenService:TokenService, public userService: UserService) {}
  // ...
  public isAuthenticated(): boolean {
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(this.tokenService.getToken());
  }
}
