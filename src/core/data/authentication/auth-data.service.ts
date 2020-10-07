import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {
  baseUrl: string = environment.baseApi;

  constructor(private http: HttpClient) { }


  login(username: string, password: string) {

    const body = new HttpParams()
      .set("grant_type", "password")
      .set("username", username)
      .set("password", password)
    return this.http.post(this.baseUrl + 'Authentication/Token', body, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
  }
}
