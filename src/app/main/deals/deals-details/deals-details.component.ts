import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery'
import { DealsService } from 'src/core/data/deals/deals.service';

@Component({
  selector: 'app-deals-details',
  templateUrl: './deals-details.component.html',
  styleUrls: ['./deals-details.component.css']
})
export class DealsDetailsComponent implements OnInit {
  id: any;
  dealDetails: any;
  constructor(private location: Location, private route: ActivatedRoute, private dealService: DealsService) { }

  ngOnInit() {
    this.getId()
    this.getDeal()
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

  getDeal() {
    this.dealService.getDealById(this.id).subscribe(
      res => {
        this.dealDetails = res['payload']
      },
      err => {
      }
    )
  }

}
