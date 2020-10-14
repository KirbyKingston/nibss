import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery'
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
  isSelected:boolean = false;
  constructor(private accountService:AccountService, private router:Router) { }

  ngOnInit() {
    this.getAllAccs()
    this.getMyAccs()
    this.getJunkAccs()
    $('#filter, #overlay').on('click', function(){
      $('.dropdown-menu.filter-drop, #overlay').toggleClass('show')
    })

    $('#more, #overlay').on('click', function(){
      $('.dropdown-menu.more-drop, #overlay').toggleClass('show')
    })
  }

  getAllAccs(){
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

  getMyAccs(){
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

  getJunkAccs(){
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


  getAcc(id){
    this.isSelected = true;
    this.accountService.getAccById(id).subscribe(
      res => {
        this.theAccount = res['payload']
        // console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }


  openAccount(id){
    this.router.navigate(['/app/accounts/account/' + id])
  }

}
