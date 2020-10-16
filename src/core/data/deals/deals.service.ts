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
    return this.http.delete(this.baseUrl + 'Deals/DeleteDeal/' + id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  ConvertDealToJunk(deal) {
    return this.http.post(this.baseUrl + 'Deals/JunkDeals', deal, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  addDealToAcc(id) {
    return this.http.post(this.baseUrl + 'Contacts/AddContactToAccount/' + id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  reactivateDeal(deal) {
    return this.http.post(this.baseUrl + 'Deals/ReactivateJunkedDeals', deal, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }
  importDeal(doc) {
    const body = new FormData()
    // body.append("Option", option)
    body.append("Document", doc)

    return this.http.post(this.baseUrl + 'Deals/ImportDealsFromExcelFile', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  createDeal(accId, accConId, dealName, dealVal, exClosingDate, estRev, ownerId, probabilty, stage, status, notes, prodId) {
    const body = new FormData()
    body.append("AccountId", accId)
    body.append("AccountContactId", accConId)
    body.append("DealName", dealName)
    body.append("DealValue", dealVal)
    body.append("ExpectedClosingDate", exClosingDate)
    body.append("EstimatedRevenue", estRev)
    body.append("OwnerId", ownerId)
    body.append("Probability", probabilty)
    body.append("Stage", stage)
    body.append("Status", status)
    body.append("notes[0].message", notes)
    body.append("ProductIds", prodId)
    // body.append("Documents", docs)
    // body.append("DocumentTypes", docTypes)
    return this.http.post(this.baseUrl + 'Deals/CreateDeal', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  updateStage(accId, accConId, dealName, id, stage, status) {
    const body = new FormData()
    body.append("AccountId", accId)
    body.append("AccountContactId", accConId)
    body.append("DealName", dealName)
    body.append("Id", id)
    body.append("Stage", stage)
    body.append("Status", status)

    return this.http.put(this.baseUrl + 'Deals/UpdateDeal', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }
  updateDeal(accId, accConId, dealName, dealValue, expCloseDate, estRev, id, ownerId, probability, stage, status) {
    const body = new FormData()
    body.append("AccountId", accId)
    body.append("AccountContactId", accConId)
    body.append("DealName", dealName)
    body.append("DealValue", dealValue)
    body.append("ExpectedClosingDate", expCloseDate)
    body.append("EstimatedRevenue", estRev)
    body.append("Id", id)
    body.append("OwnerId", ownerId)
    body.append("Probability", probability)
    body.append("Stage", stage)
    body.append("Status", status)

    return this.http.put(this.baseUrl + 'Deals/UpdateDeal', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  addNote(id, message) {
    var body = { "message": message }
    return this.http.post(this.baseUrl + 'Notes/AddNoteToDeal/' + id, body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })

  }

  sendEmail(bcc, message, cc, to, subject) {
    const body = new FormData()
    body.append("Bcc", bcc)
    body.append("Body", message)
    body.append("Cc", cc)
    body.append("RecipientEmail", to)
    body.append("Subject", subject)
    // body.append("Documents", instagram)
    // body.append("DocumentTypes", instagram)
    return this.http.post(this.baseUrl + 'Emails/SendEmail', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  addCompetitor(id, name) {
    var body = { "name": name }
    return this.http.post(this.baseUrl + 'Competitors/AddCompetitorToDeal/' + id, body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }
  addProductToDeal(dealId, productId) {
    var body = {
      "dealId": dealId,
      "productIds": productId
    }

    return this.http.post(this.baseUrl + 'Products/AddProductsToDeal', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }
}
