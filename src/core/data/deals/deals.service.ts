import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DealsService {
  baseUrl: string = environment.baseApi;
  constructor(private http: HttpClient) { }

  getAllDeal() {
    return this.http.get(this.baseUrl + 'Deals/GetAllDeals', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  getMyDeal() {
    return this.http.get(this.baseUrl + 'Deals/GetMyDeals', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }
  getJunkedDeal() {
    return this.http.get(this.baseUrl + 'Deals/GetJunkedDeals', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  getDealById(id) {
    return this.http.get(this.baseUrl + 'Deals/GetDeal/' + id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  deleteDeal(id) {
    return this.http.get(this.baseUrl + 'Deals/DeleteDeal/' + id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  ConvertDealToJunk(deal) {
    var body = { "deal": deal }
    return this.http.post(this.baseUrl + 'Deals/JunkDeals', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  addDealToAcc(id) {
    return this.http.post(this.baseUrl + 'Contacts/AddContactToAccount/' + id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  reactivateDeal(deal) {
    var body = { "deal": deal }
    return this.http.post(this.baseUrl + 'Deals/ReactivateJunkedDeals', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }
  importDeal(option, doc) {
    const body = new FormData()
    body.append("Option", option)
    body.append("Document", doc)

    return this.http.post(this.baseUrl + 'Contacts/ImportAccountContactsFromExcelFile', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  createDeal(accId, accConId,dealName,dealVal,exClosingDate, estRev, ownerId,  phone, probabilty, stage, status, notes, prodId, docs, docTypes ){
    const body = new FormData()
    body.append("AccountId", accId)
    body.append("AccountContactId", accConId)
    body.append("DealName", dealName)
    body.append("DealValue", dealVal)
    body.append("ExpectedClosingDate", exClosingDate)
    body.append("EstimatedRevenue", estRev)
    body.append("OwnerId", ownerId)
    body.append("PhoneNumber", phone)
    body.append("Probability", probabilty)
    body.append("Stage", stage)
    body.append("Status", status)
    body.append("Notes", notes)
    body.append("ProductIds", prodId)
    body.append("Documents", docs)
    body.append("DocumentTypes", docTypes)
    return this.http.post(this.baseUrl + 'Deals/CreateDeal', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  updateDeal(accName, image, estTransVal, facebook, id, instagram, institutionType, ownerId, phone, transVol, twitter, web, yearEs, addresses, cons, notes, docs, docTypes) {
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
    // body.append("Documents", docs)
    // body.append("DocumentTypes", docTypes)
    return this.http.put(this.baseUrl + 'Accounts​/UpdateAccount', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }
}
