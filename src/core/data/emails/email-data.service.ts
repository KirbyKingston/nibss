import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailDataService {
  baseUrl: string = environment.baseApi;
  constructor(private http: HttpClient) { }


  sendEmail(message, to, subject, docs, cc, bcc) {
    const body = new FormData()
    body.append("body", message)
    body.append("recipients", to)
    body.append("subject", subject)
    if (docs) {
      body.append("documents", docs)
    }
    if (cc) {
      body.append("cc", cc)
    } if (bcc) {
      body.append("bcc", bcc)
    }
    return this.http.post(this.baseUrl + 'Emails/SendEmail', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  forwardEmail(comment, id, to) {
    const body = new FormData()
    body.append("comment", comment)
    body.append("emailToForwardId", id)
    body.append("recipients", to)
    return this.http.post(this.baseUrl + 'Emails/ForwardEmail', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }
  replyEmail(message, to, subject, docs, id, cc, bcc) {
    const body = new FormData()
    body.append("body", message)
    body.append("recipients", to)
    body.append("subject", subject)
    if (docs) {
      body.append("documents", docs)
    }
    body.append("emailToReplyId", id)
    if (cc) {
      body.append("cc", cc)
    } if (bcc) {
      body.append("bcc", bcc)
    }


    return this.http.post(this.baseUrl + 'Emails/ReplyEmail', body, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  getSentAccMail(id) {
    return this.http.get(this.baseUrl + 'Emails/GetEmailsSentToAccount?accountId=' + id + '&pageSize=10&skipToken', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  getReceivedAccMail(id) {
    return this.http.get(this.baseUrl + 'Emails/GetEmailsReceivedFromAccount?accountId=' + id + '&pageSize=10&skipToken', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }


  getSentAccConMail(id) {
    return this.http.get(this.baseUrl + 'Emails/GetEmailsSentToAccountContact?accountContactId=' + id + '&pageSize=10&skipToken', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  getReceivedAccConMail(id) {
    return this.http.get(this.baseUrl + 'Emails/GetEmailsReceivedFromAccountContact?accountContactId=' + id + '&pageSize=10&skipToken', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  getSentLeadMail(id) {
    return this.http.get(this.baseUrl + 'Emails/GetEmailsSentToLead?leadId=' + id + '&pageSize=10&skipToken', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  getReceivedLeadMail(id) {
    return this.http.get(this.baseUrl + 'Emails/GetEmailsReceivedFromLead?leadId=' + id + '&pageSize=10&skipToken', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  getAccountMailCount(id){
    return this.http.get(this.baseUrl + 'Emails/GetUnreadEmailsCountFromAccount?accountId=' + id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }
  getAccountContactMailCount(id){
    return this.http.get(this.baseUrl + 'Emails/GetUnreadEmailsCountFromAccountContact?accountContactId=' + id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

  getEmail(id) {
    return this.http.get(this.baseUrl + 'Emails/GetEmail?emailId=' + id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }


  deleteEmail(id){
    return this.http.delete(this.baseUrl + 'Emails/DeleteEmail?emailId=' + id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("access_token") } })
  }

}
