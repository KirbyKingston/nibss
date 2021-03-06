import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl: string = environment.baseApi;
  constructor(private http: HttpClient) { }

  getAllAcc(){
    return this.http.get(this.baseUrl + 'Accounts/GetAllAccounts', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  getMyAcc(){
    return this.http.get(this.baseUrl + 'Accounts/GetMyAccounts', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }
  getJunkedAcc(){
    return this.http.get(this.baseUrl + 'Accounts/GetJunkedAccounts', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  getAccById(id){
    return this.http.get(this.baseUrl + 'Accounts/GetAccount/' + id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  deleteAcc(id){
    return this.http.get(this.baseUrl + 'Accounts/DeleteAccount/' + id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  ConvertAccToJunk(acc){
    return this.http.post(this.baseUrl + 'Accounts/JunkAccounts', acc, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }


  reactivateAcc(acc){
    return this.http.post(this.baseUrl + 'Accounts/ReactivateJunkedAccounts', acc, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }
  createAcc(accName, image,estTransVal,facebook,instagram, institutionType, ownerId,  ophone, transVol, twitter, web, yearEs, city, country, street, postalCode, email, firstName, lastName, designation, title, phone,  message ){
    const body = new FormData()
    body.append("AccountName", accName)
    body.append("DisplayImage", image)
    body.append("EstimatedTransactionValue", estTransVal)
    body.append("Facebook", facebook)
    body.append("Instagram", instagram)
    body.append("InstitutionType", institutionType)
    body.append("OwnerId", ownerId)
    body.append("PhoneNumber", ophone)
    body.append("TransactionVolume", transVol)
    body.append("Twitter", twitter)
    body.append("Website", web)
    body.append("YearEstablished", yearEs) 
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
    // body.append("Documents", docs)
    // body.append("DocumentTypes", docTypes)
    return this.http.post(this.baseUrl + 'Accounts/CreateAccount', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  updateAcc(accName, image,estTransVal,facebook, id, instagram, institutionType, ownerId,  phone, transVol, twitter, web, yearEs, addresses, cons, notes, docs, docTypes ){
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

  addNote(id, message){
    var body = {"message": message}
    return this.http.post(this.baseUrl + 'Notes/AddNoteToAccount/' + id, body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  
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
}
