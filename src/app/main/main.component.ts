import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  userDetails: any;
  constructor() { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.userDetails = helper.decodeToken(localStorage.getItem('access_token'))
  }

}
