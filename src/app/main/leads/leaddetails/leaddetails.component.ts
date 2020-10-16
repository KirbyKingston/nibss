import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery'
import { AuthDataService } from 'src/core/data/authentication/auth-data.service';
import { LeadsService } from 'src/core/data/leads/leads.service';
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
  constructor(private location: Location, private route: ActivatedRoute, private leadService: LeadsService, private authService: AuthDataService) { }
  ngOnInit() {
    this.getId();
    this.getLead();
    this.getUsers();

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
        console.log(this.leadDetails.institutionType)

      },
      err => {
      }
    )
  }

  getUsers() {
    this.authService.getUsers().subscribe(
      res => {
        this.users = res['payload']
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
      }
    )
  }

  junkLead() {
    this.id = parseInt(this.id);
    this.jLeads.push(this.id)
    this.leadService.junkLead(this.jLeads).subscribe(
      res => {
        this.jsuccess = true;
      }
    )
  }

  createNote(id) {
    this.leadService.addNote(id, this.noteMessage).subscribe(
      res => {
        console.log(res)
        this.noteMessage = ''
        this.getLead()
      }
    )
  }

  sendMail() {
    this.leadService.sendEmail(this.bcc, this.body, this.cc, this.to, this.subject).subscribe(
      res => {
        this.esuccess = true;
        this.bcc = this.body = this.cc = this.to = this.subject = '';
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
  

    this.leadService.updateStatus(this.leadDetails.companyName, this.leadDetails.id, this.insType, this.leadStage, this.leadStatus).subscribe(
      res => {
        this.ssuccess = true;
      }
    )
  }
  updateLead() {
    this.leadService.updateLead(this.leadDetails.companyName, this.disImage, this.leadDetails.estimatedTransactionValue, this.leadDetails.facebook, this.leadDetails.id, this.leadDetails.instagram, this.leadDetails.institutionType, this.leadDetails.ownerId, this.leadDetails.phoneNumber, this.leadDetails.source, this.leadDetails.stage, this.leadDetails.status, this.leadDetails.transactionVolume, this.leadDetails.twitter, this.leadDetails.website, this.leadDetails.yearEstablished).subscribe(
      res => {
        this.usuccess = true;
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
