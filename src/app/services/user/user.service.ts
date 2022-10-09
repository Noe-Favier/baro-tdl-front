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
  private readonly apiUrl = environment.apiUrl;


  constructor(private http: HttpClient, private tokenService: TokenService) { }

  login(username: string, pwd: string): Observable<string> {
    let url = `${this.apiUrl}/login`;
    return this.http.post<string>(url, {login:username, password:pwd});
  }

  getCurrentUser(): User {
    return this.tokenService.getDecodedToken().user as User;
  }

  getAllUsers(): Observable<User[]> {
    let url = `${this.apiUrl}/user`;
    return this.http.get<User[]>(url);
  }
}
