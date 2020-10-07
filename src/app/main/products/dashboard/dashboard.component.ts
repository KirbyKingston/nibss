import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  files: any;
  constructor() { }

  ngOnInit() {
    $('#filter, #overlay').on('click', function () {
      $('.dropdown-menu, #overlay').toggleClass('show')
    })
  }

  uploadFile(e: FileList) {
    this.files = e;
    console.log(this.files)
    const size = e[0].size
    if (size >= 505000000) {
      // this.notification.publishMessages('Please upload limit is 5mb', 'warning', 0)
      return false;
    }
    // this.bulkUpload();
  }
}
