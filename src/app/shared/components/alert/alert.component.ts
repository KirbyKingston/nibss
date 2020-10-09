import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/core/classes/notification/notification.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  notify: any;
  constructor(private alert: NotificationService) { }

  ngOnInit() {
    this.alert.alertStatus.subscribe(
      res => {
        this.notify = res
      }
    )
  }

}
