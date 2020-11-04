import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery'
import { NotificationService } from 'src/core/classes/notification/notification.service';
import { ContactService } from 'src/core/data/contact/contact.service';
import { EmailDataService } from 'src/core/data/emails/email-data.service';
@Component({
  selector: 'app-contactdetails',
  templateUrl: './contactdetails.component.html',
  styleUrls: ['./contactdetails.component.css']
})
export class ContactdetailsComponent implements OnInit {
  id: any;
  contact: any;
  jsuccess: boolean = false;
  esuccess: boolean = false;
  jContacts: Array<{}> = [];
  to: any = '';
  cc: any = '';
  bcc: any = '';
  subject: any = '';
  body: any = '';
  sentEmails: any;
  receivedEmails: any;
  files: any;
  theEmail: any;
  mailCount: any;
  constructor(private location: Location, private route: ActivatedRoute, private router: Router, private emailService: EmailDataService, private contactService: ContactService, private notification: NotificationService) { }

  ngOnInit() {
    this.getId()
    this.getContact()
    $('.showinfo').click(function () {
      $('#information').show(300);
      $('.showinfo').hide(0);
      $('.hideinfo').show(0);
    });
    $('.hideinfo').click(function () {
      $('#information').hide(300);
      $('.showinfo').show(0);
      $('.hideinfo').hide(0);
    });
  }

  backClicked() {
    this.location.back();
  }

  getId() {
    this.route.params.subscribe(
      res => {
        this.id = res['id']
      })
  }

  getContact() {
    this.contactService.getContactById(this.id).subscribe(
      res => {
        this.contact = res['payload']
        this.getEmailsFromContact(res['payload']['id'])
        this.getEmailsSentContact(res['payload']['id'])
        this.getUnreadEmailCount(res['payload']['id'])
      },
      err => {
      }
    )
  }

  uploadFile(e: FileList) {
    this.files = e[0];
    console.log(this.files)
    const size = e[0].size
    if (size >= 505000000) {
      return false;
    }
  }
  sendMail() {
    this.emailService.sendEmail(this.body, this.to, this.subject, this.files, this.cc, this.bcc).subscribe(
      res => {
        if (res['code'] == -1) {
          this.notification.publishMessages(res['description'], 'warning', 0)
        } else {
          this.esuccess = true;
          this.bcc = this.body = this.cc = this.to = this.subject = '';
          this.getContact();

        }

      }
    )
  }

  replyEmail() {
    this.emailService.replyEmail(this.body, this.theEmail.senderEmail, this.subject, this.files, this.theEmail.id, this.cc, this.bcc).subscribe(
      res => {
        if (res['code'] == -1) {
          this.notification.publishMessages(res['description'], 'warning', 0)
        } else {
          this.esuccess = true;
          this.bcc = this.body = this.cc = this.to = this.subject = '';
          this.getContact()
        }

      }
    )
  }
  getEmail(id) {
    this.emailService.getEmail(id).subscribe(
      res => {
        this.theEmail = res['payload']
      }
    )
  }
  getUnreadEmailCount(id) {
    this.emailService.getAccountMailCount(id).subscribe(
      res => {
        this.mailCount = res['payload']
      }
    )
  }
  getEmailsFromContact(id) {
    this.emailService.getReceivedAccConMail(id).subscribe(
      res => {
        this.receivedEmails = res['payload']['messages']
      }
    )
  }
  getEmailsSentContact(id) {
    this.emailService.getSentAccConMail(id).subscribe(
      res => {
        this.sentEmails = res['payload']['messages']
      }
    )
  }
  openEmail(id){
    this.router.navigate(['/app/email/' + id])
  }
  openAccount(id){
    this.router.navigate(['/app/accounts/account/' + id])
  }
  junkContact() {
    this.jContacts = []
    this.id = parseInt(this.id)
    this.jContacts.push(this.id)
    this.contactService.ConvertContactToJunk(this.jContacts).subscribe(
      res => {
        if (res['hasErrors'] == true) {
          this.notification.publishMessages(res['description'], 'warning', 0)
        } else {
          this.jsuccess = true
          this.getContact()
        }


      }
    )
  }
  reactivateContact() {
    this.jContacts = []
    this.id = parseInt(this.id)
    this.jContacts.push(this.id)
    this.contactService.reactivateContact(this.jContacts).subscribe(
      res => {
        if (res['hasErrors'] == true) {
          this.notification.publishMessages(res['description'], 'warning', 0)
        } else {
          this.jsuccess = true
          this.getContact()
        }


      }
    )
  }

  closejSuccess() {
    this.jsuccess = false
    // this.location.back();
  }

  closeeSuccess() {
    this.esuccess = false
  }
}
