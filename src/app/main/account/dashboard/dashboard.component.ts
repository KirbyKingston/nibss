import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery'
import { NotificationService } from 'src/core/classes/notification/notification.service';
import { AccountService } from 'src/core/data/account/account.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allAccounts: any = [];
  myAccounts: any = [];
  junkAccounts: any = [];
  theAccount: any;
  cAccount: Array<{}> = [];
  isSelected: boolean = false;
  jsuccess: boolean = false;
  nsuccess: boolean = false;
  rsuccess: boolean = false;
  dsuccess: boolean = false;
  nfObject;
  constructor(private accountService: AccountService, private router: Router, private notification: NotificationService) { }

  ngOnInit() {
    this.getAllAccs()
    this.getMyAccs()
    this.getJunkAccs()
    $('#filter, #overlay').on('click', function () {
      $('.dropdown-menu.filter-drop, #overlay').toggleClass('show')
    })

    $('#more, #overlay').on('click', function () {
      $('.dropdown-menu.more-drop, #overlay').toggleClass('show')
    })
  }

  getAllAccs() {
    this.accountService.getAllAcc().subscribe(
      res => {
        // console.log(res)
        this.allAccounts = res['payload']
        this.allAccounts.forEach(element => {
          element['checked'] = false;
        });
        console.log(this.allAccounts)
      },
      err => {
        console.log(err)
      }
    )
  }

  getMyAccs() {
    this.accountService.getMyAcc().subscribe(
      res => {
        this.myAccounts = res['payload']

        // console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }

  getJunkAccs() {
    this.accountService.getJunkedAcc().subscribe(
      res => {
        this.junkAccounts = res['payload']
        // console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }


  getAcc(id) {
    this.isSelected = true;
    this.accountService.getAccById(id).subscribe(
      res => {
        this.theAccount = res['payload']
        this.nfObject = new Intl.NumberFormat("en-US");
        this.theAccount.transactionVolume = this.nfObject.format(this.theAccount.transactionVolume);
        // console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }


  openAccount(id) {
    this.router.navigate(['/app/accounts/account/' + id])
  }
  openContact(id) {
    this.router.navigate(['/app/contacts/contact/' + id])
  }
  junkAccount(id) {
    this.cAccount.push(id)
    this.accountService.ConvertAccToJunk(this.cAccount).subscribe(
      res => {
        if (res['hasErrors'] == false) {
          this.jsuccess = true;
          this.getAllAccs()
          this.getMyAccs()
          this.getJunkAccs()
        } else {
          this.notification.publishMessages(res['description'], 'warning', 0)
        }


      }
    )
  }
  reactivateAccount(id) {
    this.cAccount.push(id)
    this.accountService.reactivateAcc(this.cAccount).subscribe(
      res => {
        this.rsuccess = true;
        this.getAllAccs()
        this.getMyAccs()
        this.getJunkAccs()
      }
    )
  }
  deleteAccount(id) {
    this.accountService.deleteAcc(id).subscribe(
      res => {
        this.dsuccess = true;
        this.getAllAccs()
        this.getMyAccs()
        this.getJunkAccs()
      }
    )
  }

  createAccount() {

  }
  closejSuccess() {
    this.jsuccess = false
  }
  closenSuccess() {
    this.nsuccess = false
  }

  closerSuccess() {
    this.rsuccess = false
  }
  closedSuccess() {
    this.dsuccess = false
  }

}
