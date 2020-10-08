import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery'
@Component({
  selector: 'app-leaddetails',
  templateUrl: './leaddetails.component.html',
  styleUrls: ['./leaddetails.component.css']
})
export class LeaddetailsComponent implements OnInit {
  id: any;
  constructor(private location: Location, private route: ActivatedRoute) { }
  ngOnInit() {
    this.getId();

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

}
