import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MsalService } from '@azure/msal-angular';
import { AuthError, InteractionRequiredAuthError } from 'msal';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  userDetails: any;
  profile;
  constructor(private router: Router, private authService: MsalService, private http: HttpClient) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.userDetails = helper.decodeToken(localStorage.getItem('access_token'))

    this.getProfile()
    // console.log(this.userDetails)
  }
  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe({
        next: (profile) => {
          this.profile = profile;
        },
        error: (err: AuthError) => {
          // If there is an interaction required error,
          // call one of the interactive methods and then make the request again.
          if (InteractionRequiredAuthError.isInteractionRequiredError(err.errorCode)) {
            this.authService.acquireTokenPopup({
              scopes: this.authService.getScopesForEndpoint(GRAPH_ENDPOINT)
            })
              .then(() => {
                this.http.get(GRAPH_ENDPOINT)
                  .toPromise()
                  .then(profile => {
                    this.profile = profile;
                  });
              });
          }
        }
      });
  }
  logout() {
    this.authService.logout();
    window.localStorage.clear();
    this.router.navigate(['/']);
  }

  logOut() {
    window.localStorage.clear();
    this.router.navigate(['/']);
  }

}
