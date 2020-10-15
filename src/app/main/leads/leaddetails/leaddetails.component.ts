import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery'
import { LeadsService } from 'src/core/data/leads/leads.service';
@Component({
  selector: 'app-leaddetails',
  templateUrl: './leaddetails.component.html',
  styleUrls: ['./leaddetails.component.css']
})
export class LeaddetailsComponent implements OnInit {
  id: any;
  leadDetails: any;
  cLeads: Array<{}> = [];
  jLeads: Array<{}> = [];
  csuccess:boolean = false;
  jsuccess:boolean = false;
  constructor(private location: Location, private route: ActivatedRoute, private leadService: LeadsService) { }
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
    this.leadService.getLeadById(this.id).subscribe(
      res => {
        this.leadDetails = res['payload']
      },
      err => {
      }
    )
  }

  convertToDeal() {
    this.id = parseInt(this.id);
    this.cLeads.push(this.id) 
    this.leadService.ConvertLeadToDeal(this.cLeads).subscribe(
      res => {
        this.csuccess = true;
      }
    )
  }

  junkLead() {
    this.id = parseInt(this.id);
    this.jLeads.push(this.id) 
    this.leadService.junkLead(this.jLeads).subscribe(
      res => {
        this.jsuccess = true;
      }
    )
  }

  closecSuccess(){
    this.csuccess = false
  }

  closejSuccess(){
    this.jsuccess = false
  }
}
