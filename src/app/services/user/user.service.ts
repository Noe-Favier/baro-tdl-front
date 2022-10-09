import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {User} from "../../models/user";
import {TokenService} from "../../auth/token.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = environment.apiUrl;


  constructor(private http: HttpClient, private tokenService: TokenService, private router: Router) { }

  login(username: string, pwd: string): Observable<string> {
    let url = `${this.apiUrl}/login`;
    return this.http.post<string>(url, {login:username, password:pwd});
  }

  logout(){
    this.tokenService.deleteToken();
  }

  getCurrentUser(): User | undefined {
    try {
      return this.tokenService.getDecodedToken().user as User;
    }catch (e) {
      //token is invalid
      return undefined;
    }
  }

  getAllUsers(): Observable<User[]> {
    let url = `${this.apiUrl}/user`;
    return this.http.get<User[]>(url);
  }
}
