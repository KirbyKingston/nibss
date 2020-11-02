import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthDataService } from 'src/core/data/authentication/auth-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userDetail: any;
  constructor(private authService: AuthDataService, private router: Router) { }

  ngOnInit() {}

  login(form: NgForm) {
    this.authService.login(form.value.username, form.value.password).subscribe(
      res => {

        localStorage.setItem('access_token', res['access_token'])

        this.router.navigate(['/app/leads'])

      },
      err => {
        console.log(err);
      }
    )
  }

  getCode(){
    this.authService.getAuth().subscribe(
      res => {
        console.log(res)
      }
    )
  }
}
