import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl: string = environment.baseApi;
  constructor(private http: HttpClient) { }


  getAllProducts() {
    return this.http.get(this.baseUrl + 'Products/GetAllProducts', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  getMyProducts() {
    return this.http.get(this.baseUrl + 'Products/GetMyProducts', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }
  getJunkedProducts() {
    return this.http.get(this.baseUrl + 'Products/GetJunkedProducts', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  getProductById(id) {
    return this.http.get(this.baseUrl + 'Products/GetProduct/' + id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  deleteProduct(id) {
    return this.http.get(this.baseUrl + 'Products/DeleteProduct/' + id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  ConvertProductToJunk(product) {
    return this.http.post(this.baseUrl + 'Products/JunkProducts', product, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  addProductToDeal(dealId, productId) {
    const body = new FormData()
    body.append("dealId", dealId)
    body.append("productIds", productId)
    return this.http.post(this.baseUrl + 'Products/AddContactToAccount', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }
  addProductToLead(leadId, productId) {
    const body = new FormData()
    body.append("leadId", leadId)
    body.append("productIds", productId)
    return this.http.post(this.baseUrl + 'Products/AddContactToAccount', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }
  removeProductFromDeal(dealId, productId) {
    const body = new FormData()
    body.append("dealId", dealId)
    body.append("productIds", productId)
    return this.http.post(this.baseUrl + 'Products/AddContactToAccount', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }
  removeProductFromLead(leadId, productId) {
    const body = new FormData()
    body.append("leadId", leadId)
    body.append("productIds", productId)
    return this.http.post(this.baseUrl + 'Products/AddContactToAccount', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  reactivateProduct(product) {
    return this.http.post(this.baseUrl + 'Products/ReactivateJunkedProducts', product, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }
  
  importProduct(doc) {
    const body = new FormData()
    // body.append("Option", option)
    body.append("Document", doc)

    return this.http.post(this.baseUrl + 'Products/ImportProductsFromExcelFile', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  addCompetitor(id, name) {
    var body = { "name": name }
    return this.http.post(this.baseUrl + 'Competitors/AddCompetitorToProduct/' + id, body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  updateProduct(category, ddescription, fee, id, name, duration, tag, tax) {
    const body = new FormData()
    body.append("Category", category)
    body.append("Description", ddescription)
    body.append("Fee", fee)
    body.append("Id", id)
    // body.append("Logo", logo)
    body.append("ManagerId", id)
    body.append("Name", name)
    body.append("OnboardingDuration", duration)
    body.append("Tag", tag)
    body.append("TaxRate", tax)
    return this.http.put(this.baseUrl + 'Products/UpdateProduct', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }


  createProduct(category, description, fee, logo, id, name, duration, tag, tax) {
    const body = new FormData()
    body.append("Category", category)
    body.append("Description", description)
    body.append("Fee", fee)
    body.append("Logo", logo)
    body.append("ManagerId", id)
    body.append("Name", name)
    body.append("OnboardingDuration", duration)
    body.append("Tag", tag)
    body.append("TaxRate", tax)
    // body.append("DocumentTypes", docType) 
    // body.append("Documents", docs)
    return this.http.post(this.baseUrl + 'Products/CreateProduct', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }
  addNote(id, message) {
    var body = { "message": message }
    return this.http.post(this.baseUrl + 'Notes/AddNoteToProduct/' + id, body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })

  }

  sendEmail(bcc, message, cc, to, subject) {
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
