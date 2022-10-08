import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService, public tokenService:TokenService) {}
  // ...
  public isAuthenticated(): boolean {
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(this.tokenService.getToken());
  }

  public logout(): void {
    this.tokenService.deleteToken();
  }
}
