import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private readonly _baseURL: string = 'http://127.0.0.1:8000/';

  constructor(private _http: HttpClient) { }

  public getRequest<responseType>(url: string): Observable<responseType> {
    return this._http.get<responseType>(this._baseURL + url);
  }

  postRequest<responseType>(url: string, body: any): Observable<responseType> {
    return this._http.post<responseType>(this._baseURL + url, body);
  }
}
