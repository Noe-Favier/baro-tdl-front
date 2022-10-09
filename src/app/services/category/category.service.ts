import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../models/user";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Category} from "../../models/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getCategoriesByUser(username: string): Observable<Category[]> {
    let url = `${this.apiUrl}/user/${username}/categories`;
    return this.http.get<Category[]>(url);
  }

  getCategoryById(code: string | null): Observable<Category> {
    let url = `${this.apiUrl}/category/by/${code}`;
    return this.http.get<Category>(url);
  }

  replaceLinkedUsersBy(usernames: string[], code:string): Observable<any> {
    let url = `${this.apiUrl}/category/link/user`;
    return this.http.post<any>(url,{usernames:usernames, category_code:code});
  }
}
