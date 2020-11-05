import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery'
import { NotificationService } from 'src/core/classes/notification/notification.service';
import { AuthDataService } from 'src/core/data/authentication/auth-data.service';
import { EmailDataService } from 'src/core/data/emails/email-data.service';
import { LeadsService } from 'src/core/data/leads/leads.service';
import { ProductsService } from 'src/core/data/products/products.service';
@Component({
  selector: 'app-leaddetails',
  templateUrl: './leaddetails.component.html',
  styleUrls: ['./leaddetails.component.css']
})
export class LeaddetailsComponent implements OnInit {
  id: any;
  leadDetails: any;
  cLeads: Array<{}> = [];
  jLeads: Array<{}> = [];
  rLeads: Array<{}> = [];
  csuccess: boolean = false;
  jsuccess: boolean = false;
  esuccess: boolean = false;
  ssuccess: boolean = false;
  usuccess: boolean = false;
  noteMessage: any = '';
  files: any = '';
  to: any = '';
  cc: any = '';
  bcc: any = '';
  subject: any = '';
  body: any = '';
  users: any = '';
  disImage: any;
  insType: any = '';
  leadStatus: any = '';
  leadStage: any = '';
  products: any;
  comName: any = '';
  theProduct: any = '';
  addedPs: Array<{}> = [];
  nfObject;
  contactId: any;
  receivedEmails: any;
  sentEmails: any;
  mailCount: any;
  theEmail: any;
  constructor(private location: Location, private route: ActivatedRoute, private notification: NotificationService, private leadService: LeadsService, private authService: AuthDataService, private productService: ProductsService, private emailService: EmailDataService) { }
  ngOnInit() {
    this.getId();
    this.getLead();
    this.getUsers();
    this.getProducts();
    // this.getEmailsFromContact(this.leadDetails.contacts[0].id);

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

  uploadFile(e: FileList) {
    this.files = e[0];
    console.log(this.files)
    const size = e[0].size
    if (size >= 505000000) {
      return false;
    }
  }
  backClicked() {
    this.location.back();
  }
  getProducts() {
    this.productService.getAllProducts().subscribe(
      res => {
        this.products = res['payload']
      }
    )
  }

  getId() {
    this.route.params.subscribe(
      res => {
        this.id = res['id']
      })
  }

  getLead() {
    this.leadService.getLeadById(this.id).subscribe(
      res => {
        this.leadDetails = res['payload']
        this.getEmailsReceived(res['payload']['id'])
        this.getEmailsSent(res['payload']['id'])
        this.getUnreadEmailCount(res['payload']['id'])
        let nfObject = new Intl.NumberFormat("en-US");
        this.leadDetails.transactionVolume = nfObject.format(this.leadDetails.transactionVolume);
        this.leadDetails.estimatedTransactionValue = nfObject.format(this.leadDetails.estimatedTransactionValue);

      },
      err => {
      }
    )
  }

  getUsers() {
    this.authService.getUsers().subscribe(
      res => {
        this.users = res['payload']['users']
      },
      err => {
      }
    )
  }
  convertToDeal() {
    this.id = parseInt(this.id);
    this.cLeads.push(this.id)
    this.leadService.ConvertLeadToDeal(this.cLeads).subscribe(
      res => {
        this.csuccess = true;
        this.location.back();
      }
    )
  }

  junkLead() {
    this.id = parseInt(this.id);
    this.jLeads.push(this.id)
    this.leadService.junkLead(this.jLeads).subscribe(
      res => {
        this.jsuccess = true;
        this.getLead()
      }
    )
  }
  reactivateLead() {
    this.id = parseInt(this.id);
    this.rLeads.push(this.id)
    this.leadService.reactivateJunkedLead(this.rLeads).subscribe(
      res => {
        this.jsuccess = true;
        this.getLead()
      }
    )
  }

  createNote(id) {
    this.leadService.addNote(id, this.noteMessage).subscribe(
      res => {
        // console.log(res)
        this.noteMessage = ''
        this.getLead()
      }
    )
  }

  getEmailsReceived(id) {
    this.emailService.getReceivedLeadMail(id).subscribe(
      res => {
        this.receivedEmails = res['payload']['messages']
      }
    )
  }

  getEmailsSent(id) {
    this.emailService.getSentLeadMail(id).subscribe(
      res => {
        this.sentEmails = res['payload']['messages']
      }
    )
  }

  sendMail() {
    this.emailService.sendEmail(this.body, this.to, this.subject, this.files, this.cc, this.bcc).subscribe(
      res => {
        if (res['hasErrors'] == true) {
          this.notification.publishMessages(res['description'], 'warning', 0)
        } else {
          this.esuccess = true;
          this.bcc = this.body = this.cc = this.to = this.subject = '';
          this.getLead()
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
          this.getLead();

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
  deleteEmail(id){
    this.emailService.deleteEmail(id).subscribe(
      res => {
        this.notification.publishMessages('Email deleted successfully', 'info', 0)
        this.getLead()
      }
    )
  }
  addProductTodeal(id) {
    this.theProduct = parseInt(this.theProduct)
    this.addedPs.push(this.theProduct)
    this.leadService.addProductToLead(id, this.addedPs).subscribe(
      res => {
        this.getLead()
        this.theProduct = '';
      }
    )
  }
  addCompetition(id) {
    this.leadService.addCompetitor(id, this.comName).subscribe(
      res => {
        console.log(res)
        this.comName = ""
        this.getLead()
      }
    )
  }

  updateStatus() {
    if (this.leadDetails.institutionType == "Others") {
      this.insType = 0
    } else if (this.leadDetails.institutionType == "Microfinance Bank") {
      this.insType = 1
    } else if (this.leadDetails.institutionType == "Commercial Bank") {
      this.insType = 2
    } else if (this.leadDetails.institutionType == "Merchant Bank") {
      this.insType = 3
    } else if (this.leadDetails.institutionType == "Mortgage Bank") {
      this.insType = 4
    } else if (this.leadDetails.institutionType == "Mobile Money Operator") {
      this.insType = 5
    } else if (this.leadDetails.institutionType == "Finance House") {
      this.insType = 6
    } else if (this.leadDetails.institutionType == "Stockbroker") {
      this.insType = 7
    } else if (this.leadDetails.institutionType == "Payment Service Solution Provider") {
      this.insType = 8
    } else if (this.leadDetails.institutionType == "Pension Fund Administrator") {
      this.insType = 9
    } else if (this.leadDetails.institutionType == "Pension Fund Custodian") {
      this.insType = 10
    } else if (this.leadDetails.institutionType == "Development Finance Institutions") {
      this.insType = 11
    }

    if (this.leadDetails.status == "Cold") {
      this.leadStatus = 0
    } else if (this.leadDetails.status == "Warm") {
      this.leadStatus = 1
    } else if (this.leadDetails.status == "Hot") {
      this.leadStatus = 2
    }


    if (this.leadDetails.stage == "Open") {
      this.leadStage = 0
    } else if (this.leadDetails.stage == "Attempting Contact") {
      this.leadStage = 1
    } else if (this.leadDetails.stage == "Converted") {
      this.leadStage = 2
    } else if (this.leadDetails.stage == "Disqualified") {
      this.leadStage = 3
    } else if (this.leadDetails.stage == "Not Engaged") {
      this.leadStage = 4
    } else if (this.leadDetails.stage == "Converted with no Opportunity") {
      this.leadStage = 5
    }


    if (this.leadDetails.yearEstablished == null) {
      this.leadDetails.yearEstablished = ''
    } else {
      this.leadDetails.yearEstablished = this.leadDetails.yearEstablished
    }
    this.leadDetails.transactionVolume = parseInt(this.leadDetails.transactionVolume)
    this.leadService.updateStatus(this.leadDetails.companyName, this.leadDetails.facebook, this.leadDetails.id, this.leadDetails.instagram, this.leadDetails.estimatedTransactionValue, this.insType, this.leadDetails.phoneNumber, this.leadStage, this.leadStatus, this.leadDetails.transactionVolume, this.leadDetails.twitter, this.leadDetails.website, this.leadDetails.yearEstablished).subscribe(
      res => {
        this.ssuccess = true;
      }
    )
  }
  updateLead() {
    this.leadService.updateLead(this.leadDetails.companyName, this.disImage, this.leadDetails.estimatedTransactionValue, this.leadDetails.facebook, this.leadDetails.id, this.leadDetails.instagram, this.leadDetails.institutionType, this.leadDetails.ownerId, this.leadDetails.phoneNumber, this.leadDetails.source, this.leadDetails.stage, this.leadDetails.status, this.leadDetails.transactionVolume, this.leadDetails.twitter, this.leadDetails.website, this.leadDetails.yearEstablished).subscribe(
      res => {
        this.usuccess = true;
        this.getLead()
      }
    )
  }
  closeeSuccess() {
    this.esuccess = false
  }
  closecSuccess() {
    this.csuccess = false
  }

  closejSuccess() {
    this.jsuccess = false
  }
  closeuSuccess() {
    this.usuccess = false
  }
  closesSuccess() {
    this.ssuccess = false
  }


}
