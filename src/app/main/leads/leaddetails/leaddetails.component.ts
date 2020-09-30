import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
@Component({
  selector: 'app-leaddetails',
  templateUrl: './leaddetails.component.html',
  styleUrls: ['./leaddetails.component.css']
}) 
export class LeaddetailsComponent implements OnInit {

  constructor(private location:Location) { }

  ngOnInit() {
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

}
