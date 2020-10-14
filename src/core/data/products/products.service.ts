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

  ConvertProductToJunk(acc) {
    var body = { "acc": acc }
    return this.http.post(this.baseUrl + 'Products/JunkProducts', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
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
    var body = { product }
    return this.http.post(this.baseUrl + 'Products/ReactivateJunkedProducts', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }
  importProduct(option, doc) {
    const body = new FormData()
    body.append("Option", option)
    body.append("Document", doc)
   
    return this.http.post(this.baseUrl + 'Products/ImportProductsFromExcelFile', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  updateProduct(category, ddescription, fee, logo, id, name, duration, tag, tax, docType, docs) {
    const body = new FormData()
    body.append("Category", category)
    body.append("Description", ddescription)
    body.append("Fee", fee)
    body.append("Logo", logo)
    body.append("ManagerId", id)
    body.append("Name", name)
    body.append("OnboardingDuration", duration) 
    body.append("Tag", tag)
    body.append("TaxRate", tax)
    body.append("DocumentTypes", docType)
    body.append("Documents", docs)
    return this.http.put(this.baseUrl + 'Products/CreateProduct', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
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
}
