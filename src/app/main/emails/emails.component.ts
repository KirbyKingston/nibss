import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/core/classes/notification/notification.service';
import { EmailDataService } from 'src/core/data/emails/email-data.service';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.css']
})
export class EmailsComponent implements OnInit {
  id: any;
  email: any;
  esuccess: boolean = false;
  files: any = '';
  to: any = '';
  cc: any = '';
  bcc: any = '';
  subject: any = '';
  body: any = '';
  constructor(private route: ActivatedRoute, private location: Location, private notification: NotificationService, private emailService: EmailDataService) { }

  ngOnInit() {
    this.getId()
    this.getEmail()
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

  getEmail() {
    this.emailService.getEmail(this.id).subscribe(
      res => {
        this.email = res['payload']
      }
    )
  }

  replyEmail() {
    this.emailService.replyEmail(this.body, this.email.senderEmail, this.subject, this.files, this.email.id, this.cc, this.bcc).subscribe(
      res => {
        if (res['code'] == -1) {
          this.notification.publishMessages(res['description'], 'warning', 0)
        } else {
          this.esuccess = true;
          this.bcc = this.body = this.cc = this.to = this.subject = '';

        }

      }
    )
  }

  deleteEmail(){
    this.emailService.deleteEmail(this.id).subscribe(
      res => {
        this.notification.publishMessages('Email deleted successfully', 'info', 0)
        this.location.back();
      }
    )
  }

  closeeSuccess() {
    this.esuccess = false
  }

}
