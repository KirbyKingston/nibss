import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BroadcastService, MsalInterceptor, MsalService } from '@azure/msal-angular';
import { CryptoUtils, Logger } from 'msal';
import { Subscription } from 'rxjs';
import { AuthDataService } from 'src/core/data/authentication/auth-data.service';
const requestObj = {
  scopes: ["api://db41c711-526e-4e73-bd71-e23b0dd3fb0e/access_crm_as_user"]
};
@Component({
  selector: 'app-adlogin',
  templateUrl: './adlogin.component.html',
  styleUrls: ['./adlogin.component.css']
})
export class AdloginComponent implements OnInit {
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
    });

    loginFailureSubscription = this.broadcastService.subscribe('msal:loginFailure', payload => {

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

  login() {
    const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

    if (isIE) {
      this.authService.loginRedirect();
    } else {
      this.authService.loginPopup();
    }
  }


  goIntoApp() {
    this.authService.acquireTokenSilent(requestObj).then(tokenResponse => {
      window.localStorage.clear();

      console.log(tokenResponse.accessToken)
      localStorage.setItem('access_token', tokenResponse.accessToken)
      this.router.navigate(['/app/leads'])

    }).catch(function (error) {
      console.log(error)
    });

  }

}
