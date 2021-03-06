import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BroadcastService, MsalInterceptor, MsalService } from '@azure/msal-angular';
import { CryptoUtils, Logger } from 'msal';
import { Subscription } from 'rxjs';
import { AuthDataService } from 'src/core/data/authentication/auth-data.service';
const requestObj = {
  scopes: ["api://db41c711-526e-4e73-bd71-e23b0dd3fb0e/access_crm_as_user"]
};
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  subscriptions: Subscription[] = [];
  userDetail: any;
  isIframe = false;
  loggedIn = false;
  constructor(private authentService: AuthDataService, private router: Router, private broadcastService: BroadcastService, private authService: MsalService) { }

  ngOnInit() {
    let loginSuccessSubscription: Subscription;
    let loginFailureSubscription: Subscription;

    this.isIframe = window !== window.parent && !window.opener;

    loginSuccessSubscription = this.broadcastService.subscribe('msal:loginSuccess', payload => {
      this.goIntoApp()
      // console.log(payload)
    });

    loginFailureSubscription = this.broadcastService.subscribe('msal:loginFailure', payload => {
      // console.log(payload)
    });

    this.subscriptions.push(loginSuccessSubscription);
    this.subscriptions.push(loginFailureSubscription);






    this.authService.setLogger(new Logger((logLevel, message, piiEnabled) => {
      console.log('MSAL Logging: ', message);
    }, {
      correlationId: CryptoUtils.createNewGuid(),
      piiLoggingEnabled: false
    }));

  }



  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  log(form: NgForm) {
    this.authentService.login(form.value.username, form.value.password).subscribe(
      res => {

        localStorage.setItem('access_token', res['access_token'])

        // this.router.navigate(['/app/leads'])

      },
      err => {
        console.log(err);
      }
    )
  }

  login() {
    const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

    if (isIE) {
      this.authService.loginRedirect({
        extraScopesToConsent: ["api://db41c711-526e-4e73-bd71-e23b0dd3fb0e/access_crm_as_user", "openid", "profile"]
      });
    } else {
      this.authService.loginPopup({
        extraScopesToConsent: ["api://db41c711-526e-4e73-bd71-e23b0dd3fb0e/access_crm_as_user", "openid", "profile"]
      });
    }
  }


  goIntoApp() {
    this.authService.acquireTokenSilent(requestObj).then( tokenResponse => {
      window.localStorage.clear();

      localStorage.setItem('access_token', tokenResponse.accessToken)
      this.router.navigate(['/app/leads'])

      // console.log(tokenResponse.accessToken);
    }).catch(function (error) {
      // console.log(error);
    });
  
  }
  getCode() {
    this.authentService.getAuth().subscribe(
      res => {
        console.log(res)
      }
    )


  }
}
