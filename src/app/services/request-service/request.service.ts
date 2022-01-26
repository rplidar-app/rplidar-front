import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private _http: HttpClient) { }

  public getRequest<responseType>(url: string): Observable<responseType> {
    return this._http.get<responseType>(url);
  }
}
