import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Loginuser } from './shared/loginuser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(userInfo: Loginuser): Observable<any> {
    localStorage.setItem('ACCESS_TOKEN', "access_token");
    return this.http.get(environment.baseUrl + '/logintbls');
  }
  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null
  }
  public isLoggedOut() {
    return localStorage.removeItem('ACCESS_TOKEN');
  }
}
