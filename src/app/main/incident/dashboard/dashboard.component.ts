import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery'
import { AccountService } from 'src/core/data/account/account.service';
import { AuthDataService } from 'src/core/data/authentication/auth-data.service';
import { ContactService } from 'src/core/data/contact/contact.service';
import { DealsService } from 'src/core/data/deals/deals.service';
import { IncidentService } from 'src/core/data/incident/incident.service';
import { ProductsService } from 'src/core/data/products/products.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  files: any;
  incidents: any;
  incident: any;
  products:any;
  users:any;
  accounts:any;
  contacts:any;
  isSelected:boolean = false;
  constructor(private router: Router, private incidentService: IncidentService, private dealService:DealsService, private contactService:ContactService, private accountService:AccountService, private productService:ProductsService, private authService:AuthDataService) { }

  ngOnInit() {
    this.getIncidents()
    this.getProducts()
    this.getUsers()
    this.getAccounts()
    this.getContacts()
    $('#filter, #overlay').on('click', function () {
      $('.dropdown-menu.filter-drop, #overlay').toggleClass('show')
    })

    $('#more, #overlay').on('click', function () {
      $('.dropdown-menu.more-drop, #overlay').toggleClass('show')
    })
  }

  uploadFile(e: FileList) {
    this.files = e;
    console.log(this.files)
    const size = e[0].size
    if (size >= 505000000) {
      // this.notification.publishMessages('Please upload limit is 5mb', 'warning', 0)
      return false;
    }
    // this.bulkUpload();
  }

  getProducts(){
    this.productService.getAllProducts().subscribe(
      res => {
        this.products = res['payload']
      },
      err => {
        // console.log(err)
      }
    )
  }
  getUsers(){
    this.authService.getUsers().subscribe(
      res => {
        this.users = res['payload']
      },
      err => {
        // console.log(err)
      }
    )
  }
  getAccounts(){
    this.accountService.getAllAcc().subscribe(
      res => {
        this.accounts = res['payload']
      },
      err => {
        // console.log(err)
      }
    )
  }
 
  getContacts(){
    this.contactService.getAllContact().subscribe(
      res => {
        this.contacts = res['payload']
      },
      err => {
        // console.log(err)
      }
    )
  }
  

  getIncidents() {
    this.incidentService.getIncidents().subscribe(
      res => {
        this.incidents = res['payload'];
      },
      err => {
        console.log(err)
      }
    )
  }

  getIncident(id) {
    this.isSelected = true;
    this.incidentService.getIncidentById(id).subscribe(
      res => {
        this.incident = res['payload']
      },
      err => {
        console.log(err)
      }
    )
  }

  openIncident(id){
    this.router.navigate(['/app/incidents/incident/' + id])
  }

  createIncident(form: NgModel){
    this.incidentService.createIncident(form.value.account, form.value.title, form.value.caseType, form.value.closed, form.value.description, form.value.owner, form.value.priority, form.value.name, form.value.contact, form.value.source, form.value.status, form.value.phase).subscribe(
      res => {
        console.log(res)
        this.getIncidents()
      },
      err => {
        console.log(err)
      }
    )
  }
}
