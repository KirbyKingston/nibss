import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery'
import { ContactService } from 'src/core/data/contact/contact.service';
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
  constructor(private location: Location, private route: ActivatedRoute, private contactService: ContactService) { }

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
      },
      err => {
      }
    )
  }

  sendMail() {
    this.contactService.sendEmail(this.bcc, this.body, this.cc, this.to, this.subject).subscribe(
      res => {
        this.esuccess = true;
        this.bcc = this.body = this.cc = this.to = this.subject = '';
      }
    )
  }
  junkContact() {
    this.id = parseInt(this.id)
    this.jContacts.push(this.id)
    this.contactService.ConvertContactToJunk(this.jContacts).subscribe(
      res => {
        this.jsuccess = true

      }
    )
  }

  closejSuccess() {
    this.jsuccess = false
    this.location.back();
  }

  closeeSuccess() {
    this.esuccess = false
  }
}
