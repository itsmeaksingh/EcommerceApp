import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":"Content-Type",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    })
  }
  private _http = inject(HttpClient);
  constructor() { }

  private _formatErrors(error: any) {
    return throwError(() => error.error);
  }
  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this._http.get(path, { params }).pipe(catchError(this._formatErrors))
  }
  put(path: string, body: Object = {}): Observable<any> {
    return this._http.put(path, JSON.stringify(body), this._httpOptions).pipe(catchError(this._formatErrors))
  }
  post(path: string, body: Object = {}): Observable<any> {
    return this._http.post(path, JSON.stringify(body), this._httpOptions).pipe(catchError(this._formatErrors))
  }
  delete(path: string): Observable<any> {
    return this._http.delete(path).pipe(catchError(this._formatErrors))
  }
}
