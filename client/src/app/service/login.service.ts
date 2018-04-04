import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';

export class TokenResponse {
  token: string;
  status: number;
  message: string;
}


@Injectable()

export class LoginService {

  constructor(private http: HttpClient) {}

  login(email, password) {
    const params = {
      'email': email.value,
      'password': password.value
    };
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), method: 'POST' };
    return this.http.post<TokenResponse>(`${environment.server}/login`, JSON.stringify(params), options)
      .map((res) => res)
      .catch(this.handleObservableError);
  }

  handleObservableError(error: any) {
    return Observable.throw(error.json().error || error.json());
  }
}