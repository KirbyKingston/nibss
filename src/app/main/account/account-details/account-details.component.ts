import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery'
import { NotificationService } from 'src/core/classes/notification/notification.service';
import { AccountService } from 'src/core/data/account/account.service';
import { EmailDataService } from 'src/core/data/emails/email-data.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  id: any;
  accountDetails: any;
  esuccess: boolean = false;
  noteMessage: any = '';
  files: any = '';
  to: any = '';
  cc: any = '';
  bcc: any = '';
  subject: any = '';
  body: any = '';
  contactId: any;
  sentEmails: any;
  receivedEmails: any;
  mailCount: any;
  theEmail: any;
  p: number = 1;
  constructor(private route: ActivatedRoute, private location: Location, private router:Router, private notification:NotificationService, private emailService:EmailDataService, private accountService: AccountService) { }

  ngOnInit() {
    this.getId();
    this.getAccount();
   
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

  openContact(id){
    this.router.navigate(['/app/contacts/contact/' + id])
  }

  openEmail(id){
    this.router.navigate(['/app/email/' + id])
  }
  getAccount() {
    this.accountService.getAccById(this.id).subscribe(
      res => {
        // console.log(res)
        this.accountDetails = res['payload']
        let nfObject = new Intl.NumberFormat("en-US");
        
        this.getAccountEmails(this.accountDetails.id)
        this.getSentMails(this.accountDetails.id)
        this.getUnreadEmailCount(this.accountDetails.id)
        this.accountDetails.estimatedTransactionValue = nfObject.format(this.accountDetails.estimatedTransactionValue);
        this.accountDetails.transactionVolume = nfObject.format(this.accountDetails.transactionVolume);
      },
      err => {
        // console.log(err)
      }
    )
  }

  createNote(id){
    this.accountService.addNote(id, this.noteMessage).subscribe(
      res => {
        this.noteMessage = '';
       this.getAccount()
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
          this.getAccount();

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
          this.getAccount();

        }

      }
    )
  }

  
  
  getAccountEmails(id) {
    this.emailService.getReceivedAccMail(id).subscribe(
      res => {
        this.receivedEmails = res['payload']['messages']
      }
    )
  }
  getSentMails(id) {
    this.emailService.getSentAccMail(id).subscribe(
      res => {
        this.sentEmails = res['payload']['messages']
      }
    )
  }
  getEmail(id){
    this.emailService.getEmail(id).subscribe(
      res => {
        this.theEmail = res['payload']
        // console.log(this.theEmail)
      }
    )
  }
  getUnreadEmailCount(id){
    this.emailService.getAccountMailCount(id).subscribe(
      res => {
        this.mailCount = res['payload']
      }
    )
  }
  closeeSuccess() {
    this.esuccess = false
  }

}
