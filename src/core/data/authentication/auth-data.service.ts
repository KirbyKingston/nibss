import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {
  baseUrl: string = environment.baseApi;
  
  constructor(private http: HttpClient) { }


  login(username: string, password: string) {
    let httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const body = new FormData();
    body.append("grant_type", "password");
    body.append("username", username);
    body.append("password", password);
    return this.http.post(this.baseUrl + 'Authentication/Token', body)
  }
}
