import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery'
import { AccountService } from 'src/core/data/account/account.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  id: any;
  accountDetails: any;
  constructor(private route: ActivatedRoute, private location: Location, private accountService: AccountService) { }

  ngOnInit() {
    this.getId();
    this.getLead();
    $('.showinfo').click(function () {
      $('#information').show(300);
      $('.showinfo').hide(0);
      $('.hideinfo').show(0);
    });
    $('.hideinfo').click(function () {
      $('#information').hide(300);
      $('.showinfo').show(0);
      $('.hideinfo').hide(0);
    });
  }

  backClicked() {
    this.location.back();
  }

  getId() {
    this.route.params.subscribe(
      res => {
        this.id = res['id']
      }) 
  }

  getLead() {
    this.accountService.getAccById(this.id).subscribe(
      res => {
        console.log(res)
        this.accountDetails = res['payload']
      },
      err => {
        console.log(err)
      }
    )
  }
}
