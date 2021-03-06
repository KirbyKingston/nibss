import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {
  baseUrl: string = environment.baseApi;

  constructor(private http: HttpClient) { }

  getAllLeads() {
    return this.http.get(this.baseUrl + 'Leads/GetAllLeads', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  getMyLeads() {
    return this.http.get(this.baseUrl + 'Leads/GetMyLeads', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }
  getJunkedLeads() {
    return this.http.get(this.baseUrl + 'Leads/GetJunkedLeads', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  getLeadById(id) {
    return this.http.get(this.baseUrl + 'Leads/GetLead/' + id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  ConvertLeadToDeal(lead) {
    return this.http.post(this.baseUrl + 'Leads/ConvertLeadsToDeals', lead, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  importLeads(doc){ 
    const body = new FormData();
    // body.append("Option", option)
    body.append("Document", doc) 
    return this.http.post(this.baseUrl + 'Leads/ImportLeadsFromExcelFile', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  
  }
  deleteLead(id) {
    return this.http.get(this.baseUrl + 'Leads/DeleteLead/' + id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }
  junkLead(lead) {
    return this.http.post(this.baseUrl + 'Leads/JunkLeads', lead, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }
  reactivateJunkedLead(lead) {
    return this.http.post(this.baseUrl + 'Leads/ReactivateJunkedLeads', lead, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  createLead(companyName, image, estTransVal, facebook, instagram, institutionType, ownerId, oPhone, source, stage, status, transVol, twitter, website, yearsEstablished, city, country, street, postalCode, email, firstName, lastName, designation, title, phone, message, products) {
    const body = new FormData()
    body.append("CompanyName", companyName)
    body.append("DisplayImage", image)
    body.append("EstimatedTransactionValue", estTransVal)
    body.append("Facebook", facebook)
    body.append("Instagram", instagram)
    body.append("InstitutionType", institutionType)
    body.append("OwnerId", ownerId)
    body.append("PhoneNumber", oPhone)
    body.append("Source", source)
    body.append("Stage", stage)
    body.append("Status", status)
    body.append("TransactionVolume", transVol)
    body.append("Twitter", twitter)
    body.append("Website", website)
    body.append("YearEstablished", yearsEstablished)
    // body.append("Activities", activities)
    body.append("addresses[0].city", city)
    body.append("addresses[0].country", country)
    body.append("addresses[0].street", street)
    body.append("addresses[0].zipOrPostalCode", postalCode)
    body.append("contacts[0].email", email)
    body.append("contacts[0].firstName", firstName)
    body.append("contacts[0].lastName", lastName)
    body.append("contacts[0].designation", designation)
    body.append("contacts[0].title", title)
    body.append("contacts[0].phoneNumber", phone)
    body.append("notes[0].message", message)
    body.append("ProductIds", products)
    return this.http.post(this.baseUrl + 'Leads/CreateLead', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  updateStatus(companyName, facebook, id, instagram, estTransVal, institutionType, oPhone, stage, status, transVol, twitter, website, yearsEstablished) {
    const body = new FormData()
    body.append("CompanyName", companyName)
    body.append("Facebook", facebook)
    body.append("Id", id)
    body.append("Instagram", instagram)
    body.append("EstimatedTransactionValue", estTransVal)
    body.append("InstitutionType", institutionType)
    body.append("PhoneNumber", oPhone)
    body.append("Stage", stage)
    body.append("Status", status)
    body.append("TransactionVolume", transVol)
    body.append("Twitter", twitter)
    body.append("Website", website)
    body.append("YearEstablished", yearsEstablished)
    return this.http.put(this.baseUrl + 'Leads/UpdateLead', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }
  updateLead(companyName, image, estTransVal, facebook, id, instagram, institutionType, ownerId, oPhone, source, stage, status, transVol, twitter, website, yearsEstablished) {
    const body = new FormData()
    body.append("CompanyName", companyName)
    body.append("DisplayImage", image)
    body.append("EstimatedTransactionValue", estTransVal)
    body.append("Facebook", facebook)
    body.append("Id", id)
    body.append("Instagram", instagram)
    body.append("InstitutionType", institutionType)
    body.append("OwnerId", ownerId)
    body.append("PhoneNumber", oPhone)
    body.append("Source", source)
    body.append("Stage", stage)
    body.append("Status", status)
    body.append("TransactionVolume", transVol)
    body.append("Twitter", twitter)
    body.append("Website", website)
    body.append("YearEstablished", yearsEstablished)
    return this.http.put(this.baseUrl + 'Leads/UpdateLead', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  
  addNote(id, message){
    var body = {"message": message}
    return this.http.post(this.baseUrl + 'Notes/AddNoteToLead/' + id, body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  
  }

  sendEmail(bcc, message, cc, to, subject){
    const body = new FormData()
    body.append("Bcc", bcc)
    body.append("Body", message)
    body.append("Cc", cc)
    body.append("Recipients", to)
    body.append("Subject", subject)
    // body.append("Documents", instagram)
    // body.append("DocumentTypes", instagram)
    return this.http.post(this.baseUrl + 'Emails/SendEmail', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  addCompetitor(id, name) {
    var body = { "name": name }
    return this.http.post(this.baseUrl + 'Competitors/AddCompetitorToLead/' + id, body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  addProductToLead(leadId, productId) {
    var body = {
      "leadId": leadId,
      "productIds": productId
    }
    return this.http.post(this.baseUrl + 'Products/AddProductsToLead', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

} 


