import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-deals-details',
  templateUrl: './deals-details.component.html',
  styleUrls: ['./deals-details.component.css']
})
export class DealsDetailsComponent implements OnInit {

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
