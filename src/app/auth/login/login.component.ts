import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthDataService } from 'src/core/data/authentication/auth-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userDetail: any;
  name: string;
  username: string;
  constructor(private authService: AuthDataService, private router: Router, private _msalService: MsalService) { }

  ngOnInit() {
    const account = this._msalService.getAccount();
    this.name = account.name;
    this.username = account.userName;
  }

  // login(form: NgForm) {
  //   this.authService.login(form.value.username, form.value.password).subscribe(
  //     res => {

  //       localStorage.setItem('access_token', res['access_token'])

  //       this.router.navigate(['/app/leads'])

  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   )
  // }

  login(){
    this.authService.getAuth().subscribe(
      res => {
        console.log(res)
      }
    )
  }
}
