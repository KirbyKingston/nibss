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
    return this.http.get(this.baseUrl + 'Leads/GetAllLeads', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  getMyLeads(){
    return this.http.get(this.baseUrl + 'Leads/GetMyLeads', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }
  getJunkedLeads(){
    return this.http.get(this.baseUrl + 'Leads/GetJunkedLeads', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  getLeadById(id){
    return this.http.get(this.baseUrl + 'Leads/GetLead/' + id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  ConvertLeadToDeal(lead){
    var body = {"leads": lead}
    return this.http.post(this.baseUrl + 'Leads/ConvertLeadsToDeals', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  createLead(companyName, image,estTransVal,facebook,instagram, institutionType, ownerId,  phone, source, stage, status, transVol){
    const body = new FormData()
    body.append("CompanyName", companyName)
    body.append("DisplayImage", image)
    body.append("EstimatedTransactionValue", estTransVal)
    body.append("Facebook", facebook)
    body.append("Instagram", instagram)
    body.append("InstitutionType", institutionType)
    body.append("OwnerId", ownerId)
    body.append("PhoneNumber", phone)
    body.append("Source", source)
    body.append("Stage", stage)
    body.append("Status", status)
    body.append("TransactionVolume", transVol)
    return this.http.post(this.baseUrl + 'Leads/ConvertLeadsToDeals', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }
}
