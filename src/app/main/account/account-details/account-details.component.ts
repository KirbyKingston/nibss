import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery'
import { AccountService } from 'src/core/data/account/account.service';

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
  constructor(private route: ActivatedRoute, private location: Location, private accountService: AccountService) { }

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

  getAccount() {
    this.accountService.getAccById(this.id).subscribe(
      res => {
        // console.log(res)
        this.accountDetails = res['payload']
        let nfObject = new Intl.NumberFormat("en-US");
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
  sendMail(){
    this.accountService.sendEmail(this.bcc, this.body, this.cc, this.to, this.subject).subscribe(
      res => {
        this.esuccess = true;
        this.getAccount();
        this.bcc = this.body = this.cc = this.to = this.subject = '';
      }
    )
  }
  closeeSuccess() {
    this.esuccess = false
  }

}
