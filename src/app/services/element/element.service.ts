import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Element} from "../../models/element";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ElementService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  countCheckedFromList(elements: Element[]): number {
    return elements.filter(value => value.checked).length;
  }

  check(code: string, state: boolean): Observable<any> {
    let url = `${this.apiUrl}/element/check`;
    return this.http.post<any>(url, {code:code, state:state});
  }
}
