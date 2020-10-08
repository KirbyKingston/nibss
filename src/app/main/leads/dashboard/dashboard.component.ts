import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { LeadsService } from 'src/core/data/leads/leads.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allLeads: any;
  myLeads: any;
  junkLeads: any;
  theLead: any;
  isSelected:boolean = false;
  constructor(private leadService:LeadsService) { }

  ngOnInit() {
    this.getAllLeads();
    this.getMyLeads();
    this.getJunkLeads();

    $('#filter, #overlay').on('click', function(){
      $('.dropdown-menu.filter-drop, #overlay').toggleClass('show')
    })

    $('#more, #overlay').on('click', function(){
      $('.dropdown-menu.more-drop, #overlay').toggleClass('show')
    })
  }

  getAllLeads(){
    this.leadService.getAllLeads().subscribe(
      res => {
        console.log(res)
        this.allLeads = res['payload']
      },
      err => {
        console.log(err)
      }
    )
  }

  getMyLeads(){
    this.leadService.getMyLeads().subscribe(
      res => {
        this.myLeads = res['payload']
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }

  getJunkLeads(){
    this.leadService.getJunkedLeads().subscribe(
      res => {
        this.junkLeads = res['payload']
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }


  getLead(id){
    this.isSelected = true;
    this.leadService.getLeadById(id).subscribe(
      res => {
        this.theLead = res['payload']
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }
}
