import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery'
import { NotificationService } from 'src/core/classes/notification/notification.service';
import { AccountService } from 'src/core/data/account/account.service';
import { AuthDataService } from 'src/core/data/authentication/auth-data.service';
import { ContactService } from 'src/core/data/contact/contact.service';
import { IncidentService } from 'src/core/data/incident/incident.service';
import { ProductsService } from 'src/core/data/products/products.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  files: any;
  selectedFiles: any;
  incidents: any;
  incident: any;
  products: any;
  users: any;
  accounts: any;
  contacts: any;
  isSelected: boolean = false;
  docTypes: Array<{}> = [];
  selectedTypes: Array<{}> = [];
  types: any = '';
  account: any = '';
  title: any = '';
  caseType: any = '';
  closed: any = '';
  description: any = '';
  owner: any = '';
  priority: any = '';
  name: any = '';
  contact: any = '';
  source: any = '';
  status: any = '';
  phase: any = '';
  typeName: any = '';
  documentTypes = [
    { id: 0, document: "Others" },
    { id: 1, document: "Brochure" },
    { id: 2, document: "Picture" },
    { id: 3, document: "Presentation Slides" }
  ]
  constructor(private router: Router, private incidentService: IncidentService, private notification: NotificationService, private contactService: ContactService, private accountService: AccountService, private productService: ProductsService, private authService: AuthDataService) { }

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
    this.selectedFiles = this.files.FileList;
    console.log(this.files)
    console.log(this.selectedFiles)
    const size = e[0].size
    if (size >= 505000000) {
      return false;
    }
  }

  select() {
    this.types = parseInt(this.types)
    this.docTypes.push(this.types)
    console.log(this.docTypes)
    this.documentTypes.forEach(element => {
      if (element.id == this.types) {
        this.typeName = element.document
        this.selectedTypes.push(this.typeName)
        console.log(this.selectedTypes)
      }
    })

  }

  
  getProducts() {
    this.productService.getAllProducts().subscribe(
      res => {
        this.products = res['payload']
      },
      err => {
      }
    )
  }
  getUsers() {
    this.authService.getUsers().subscribe(
      res => {
        this.users = res['payload']
      },
      err => {
      }
    )
  }
  getAccounts() {
    this.accountService.getAllAcc().subscribe(
      res => {
        this.accounts = res['payload']
      },
      err => {
      }
    )
  }

  getContacts() {
    this.contactService.getAllContact().subscribe(
      res => {
        this.contacts = res['payload']
      },
      err => {
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

  openIncident(id) {
    this.router.navigate(['/app/incidents/incident/' + id])
  }

  createIncident() {
    this.incidentService.createIncident(this.account, this.title, this.caseType, this.closed, this.description, this.owner, this.priority, this.name, this.contact, this.source, this.status, this.phase, this.docTypes, this.files).subscribe(
      res => {
        if(res['hasErrors'] == false){
          this.getIncidents()

        }else{
          this.notification.publishMessages(res['description'], 'warning', 0)
        }
        // console.log(res)
      },
      err => {
        // console.log(err)
      }
    )
  }
}
