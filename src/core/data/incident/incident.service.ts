import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  baseUrl: string = environment.baseApi;
  constructor(private http: HttpClient) { }

  getIncidents() {
    return this.http.get(this.baseUrl + 'Incidents/GetAllIncidents', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  getIncidentById(id) {
    return this.http.get(this.baseUrl + 'Incidents/GetIncident/' + id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  deleteIncident(id) {
    return this.http.get(this.baseUrl + 'Incidents/DeleteIncident/' + id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  importIncident(option, doc) {
    const body = new FormData()
    body.append("Option", option)
    body.append("Document", doc)

    return this.http.post(this.baseUrl + 'Incidents/ImportIncidentsFromExcelFile', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  createIncident(accId, caseTitle,caseType,dateClosed,description, ownerId, priority, productId, repId, source, status, supPhase, docType, docs: []){
    const body = new FormData()
    body.append("AccountId", accId)
    body.append("CaseTitle", caseTitle)
    body.append("CaseType", caseType)
    body.append("DateClosed", dateClosed) 
    body.append("Description", description)
    body.append("OwnerId", ownerId)
    body.append("Priority", priority)
    body.append("ProductId",productId)
    body.append("ReporterId", repId)
    body.append("Source", source)
    body.append("Status", status)
    body.append("SupportPhase", supPhase)
    body.append("DocumentTypes", docType)
    for (let index = 0; index < docs.length; index++) {
      body.append('Documents', docs[index]);
    }

    return this.http.post(this.baseUrl + 'Incidents/CreateIncident', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }
  getDocument(id){
    return this.http.get(this.baseUrl + 'Files/GetFiles?fileIds[0]=' + id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  updateIncident(accId, caseTitle,caseType,dateClosed,description, ownerId, priority, productId, repId, source, status, supPhase, docType, docs){
    const body = new FormData()
    body.append("AccountId", accId)
    body.append("CaseTitle", caseTitle)
    body.append("CaseType", caseType)
    body.append("DateClosed", dateClosed)
    body.append("Description", description)
    body.append("OwnerId", ownerId)
    body.append("Priority", priority)
    body.append("ProductId",productId)
    body.append("ReporterId", repId)
    body.append("Source", source)
    body.append("Status", status)
    body.append("SupportPhase", supPhase)
    body.append("DocumentTypes", docType)
    body.append("Documents", docs)
    return this.http.put(this.baseUrl + 'Incidents/UpdateIncident', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }
 
  addNote(id, message){
    var body = {"message": message}
    return this.http.post(this.baseUrl + 'Notes/AddNoteToIncident/' + id, body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  
  }
  sendEmail(bcc, message, cc, to, subject){
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
}
