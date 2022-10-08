import { Injectable } from '@angular/core';
import decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getToken(): string{
    let token: string | null = localStorage.getItem('token');
    return token ? token : '';
  }

  getDecodedToken(): any{
    return decode(this.getToken());
  }

  setToken(token: string){
    localStorage.setItem('token', token);
  }

  deleteToken() {
    localStorage.removeItem('token');
  }
}
