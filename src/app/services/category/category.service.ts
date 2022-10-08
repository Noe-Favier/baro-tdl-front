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
}
