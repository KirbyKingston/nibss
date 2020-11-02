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

  getUsers(){
    return this.http.get(this.baseUrl + 'Users/SearchUsers?pageIndex=1&pageSize=30&filters[0].FilterColumn=AccountName&filters[0].Keyword=user&filters[0].Operation=1', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }
  

  getAuth(){
    return this.http.get('https://login.microsoftonline.com/b393417d-28bb-4622-ad5e-e5d44974ff79/oauth2/v2.0/authorize?response_type=code&state=12345&client_id=6ef517c5-ec73-454a-ac8a-dfca04230d92&scope=api://db41c711-526e-4e73-bd71-e23b0dd3fb0e/access_crm_as_user&redirect_uri=https://nibsscrm.herokuapp.com')
  }
}
