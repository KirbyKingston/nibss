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
    var body = {"acc": acc}
    return this.http.post(this.baseUrl + 'Accounts/JunkAccounts', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }


  reactivateAcc(acc){
    var body = {"acc": acc}
    return this.http.post(this.baseUrl + 'Accounts/ReactivateJunkedAccounts', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }
  createAcc(accName, image,estTransVal,facebook,instagram, institutionType, ownerId,  phone, transVol, twitter, web, yearEs, addresses, cons, notes, docs, docTypes ){
    const body = new FormData()
    body.append("AccountName", accName)
    body.append("DisplayImage", image)
    body.append("EstimatedTransactionValue", estTransVal)
    body.append("Facebook", facebook)
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
}
