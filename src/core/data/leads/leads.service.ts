import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {
  baseUrl:string = environment.baseApi;

  constructor(private http:HttpClient) { }

  getAllLeads(){
    
  }
}
