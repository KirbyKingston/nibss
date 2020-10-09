import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  baseUrl: string = environment.baseApi;
  constructor(private http: HttpClient) { }

  getAllContact() {
    return this.http.get(this.baseUrl + 'Contacts/GetAllAccountContacts', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  getMyContact() {
    return this.http.get(this.baseUrl + 'Contacts/GetMyAccountContacts', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }
  getJunkedContact() {
    return this.http.get(this.baseUrl + 'Contacts/GetJunkedAccountContacts', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  getContactById(id) {
    return this.http.get(this.baseUrl + 'Contacts/GetAccountContact/' + id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  deleteContact(id) {
    return this.http.get(this.baseUrl + 'Contacts/DeleteContact/' + id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  ConvertContactToJunk(acc) {
    var body = { "acc": acc }
    return this.http.post(this.baseUrl + 'Contacts/JunkAccountContacts', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  addContactToAcc(id) {
    return this.http.post(this.baseUrl + 'Contacts/AddContactToAccount/' + id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  reactivateContact(acc) {
    var body = { "acc": acc }
    return this.http.post(this.baseUrl + 'Contacts/ReactivateJunkedAccountContacts', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }
  importContact(option, doc) {
    const body = new FormData()
    body.append("Option", option)
    body.append("Document", doc)
   
    return this.http.post(this.baseUrl + 'Contacts/ImportAccountContactsFromExcelFile', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  updateContact(accName, image, estTransVal, facebook, id, instagram, institutionType, ownerId, phone, transVol, twitter, web, yearEs, addresses, cons, notes, docs, docTypes) {
    const body = new FormData()
    body.append("AccountName", accName)
    body.append("DisplayImage", image)
    body.append("EstimatedTransactionValue", estTransVal)
    body.append("Facebook", facebook)
    body.append("Id", id)
    body.append("Instagram", instagram)
    body.append("InstitutionType", institutionType) 
    body.append("OwnerId", ownerId)
    body.append("PhoneNumber", phone)
    body.append("TransactionVolume", transVol)
    body.append("Twitter", twitter)
    body.append("Website", web)
    body.append("YearEstablished", yearEs)
    body.append("Addresses", addresses)
    body.append("Contacts", cons)
    body.append("Notes", notes)
    body.append("Documents", docs)
    body.append("DocumentTypes", docTypes)
    return this.http.put(this.baseUrl + 'Accounts​/UpdateAccount', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }
}
