import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor(private http: HttpClient) { }

  login(username: string, pwd: string): Observable<string> {
    let url = `${environment.apiUrl}/login`;
    console.log(url)
    return this.http.post<string>(url, {login:username, password:pwd});
  }
}
