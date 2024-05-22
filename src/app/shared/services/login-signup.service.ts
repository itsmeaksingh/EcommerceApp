import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {

  public login_url: string = "http://localhost:3000";
  public reg_url: string = "http://localhost:3000";

  constructor(private _http: HttpClient, private _apiService: ApiService) { }

  authLogin(user_name: string, password: string): Observable<any> {
    const url = this.login_url + '/user?email=' + user_name + '&password=' + password;
    return this._apiService.get(url);
  }

  userRegister(user_data: any): Observable<any> {
    return this._apiService.post(this.reg_url + '/user', user_data);
  }

  adminLogin(user_name: string, password: string): Observable<any> {
    const url = this.login_url + '/user?email=' + user_name + '&password=' + password + '&role=admin';
    return this._apiService.get(url);
  }
}
