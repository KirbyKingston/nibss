import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  userDetails: any;
  constructor(private router:Router) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.userDetails = helper.decodeToken(localStorage.getItem('access_token'))

    // console.log(this.userDetails)
  }

  logOut(){
    window.localStorage.clear();
    this.router.navigate(['/']);
  }

}
