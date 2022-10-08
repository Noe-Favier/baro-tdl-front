import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {User} from "../../models/user";
import {TokenService} from "../../auth/token.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor(private http: HttpClient, private tokenService: TokenService) { }

  login(username: string, pwd: string): Observable<string> {
    let url = `${environment.apiUrl}/login`;
    console.log(url)
    return this.http.post<string>(url, {login:username, password:pwd});
  }

  getCurrentUser(): User {
    return this.tokenService.getDecodedToken().user as User;
  }
}
