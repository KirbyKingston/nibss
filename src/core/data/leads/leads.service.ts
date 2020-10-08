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
    return this.http.get(this.baseUrl + 'Leads/GetAllLeads')
  }

  ConvertLeadToDeal(lead: string){
    var body = {"leads": lead}
    return this.http.post(this.baseUrl + 'Leads/ConvertLeadsToDeals', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  createLead(description, response, status, subject, type){
    const body = new FormData()
    body.append("activities[0][description]", description)
    body.append("activities[0][response]", response)
    body.append("activities[0][status]", status)
    body.append("activities[0][subject]", subject)
    body.append("activities[0][type]", type)
    return this.http.post(this.baseUrl + 'Leads/ConvertLeadsToDeals', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }
}
