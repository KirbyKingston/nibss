import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ContactService } from 'src/core/data/contact/contact.service';
import { AccountService } from 'src/core/data/account/account.service';
import { NotificationService } from 'src/core/classes/notification/notification.service';

export interface PeriodicElement {
  Amount: string;
  TXDate: string;
  ValueDate: string;
  Reference: string;
  TXType: string;
  Balance: string;
  Remarks: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ELEMENT_DATA: PeriodicElement[] = [
    { Amount: '50,000.00', TXDate: '12 Jan 2020', ValueDate: '12 Jan 2020', Reference: 'T009998201131', TXType: 'Credit', Balance: '50,000.00', Remarks: 'TUD/IBG/FUND-...' },
    { Amount: '10,000.00', TXDate: '12 Jan 2020', ValueDate: '12 Jan 2020', Reference: 'T009998201131', TXType: 'Debit', Balance: '50,000.00', Remarks: 'TUD/IBG/FUND-...' },
    { Amount: '10,000.00', TXDate: '12 Jan 2020', ValueDate: '12 Jan 2020', Reference: 'T009998201131', TXType: 'Credit', Balance: '50,000.00', Remarks: 'TUD/IBG/FUND-...' },
    { Amount: '25,000.00', TXDate: '12 Jan 2020', ValueDate: '12 Jan 2020', Reference: 'T009998201131', TXType: 'Credit', Balance: '50,000.00', Remarks: 'TUD/IBG/FUND-...' },
    { Amount: '10,000.00', TXDate: '12 Jan 2020', ValueDate: '12 Jan 2020', Reference: 'T009998201131', TXType: 'Credit', Balance: '50,000.00', Remarks: 'TUD/IBG/FUND-...' }
  ];

  displayedColumns: string[] = ['Amount', 'TXDate', 'ValueDate', 'Reference', 'TXType', 'Balance', 'Remarks'];

  dataSource: MatTableDataSource<any>;


  allCons: any;
  myCons: any;
  junkCons: any;
  theCons: any;
  accounts: any;
  isSelected: boolean = false;
  jsuccess: boolean = false;
  isuccess: boolean = false;
  jContacts: Array<{}> = [];
  files: any;
  cContacts: Array<{}> = [];
  constructor(private router: Router, private contactService: ContactService, private accountService: AccountService, private notification: NotificationService) { }

  ngOnInit() {
    this.getAllContacts()
    this.getJunkContacts()
    this.getMyContacts()
    this.getAccounts();
    this.dataSource = new MatTableDataSource([...this.ELEMENT_DATA]);
    $('#filter, #overlay').on('click', function () {
      $('.dropdown-menu.filter-drop, #overlay').toggleClass('show')
    })

    $('#more, #overlay').on('click', function () {
      $('.dropdown-menu.more-drop, #overlay').toggleClass('show')
    })
  }
  uploadFile(e: FileList) {
    this.files = e[0];
    console.log(this.files)
    const size = e[0].size
    if (size >= 505000000) {
      return false;
    }
  }
  importContacts() {
    this.contactService.importContact(this.files).subscribe(
      res => {
        this.isuccess = true;
        this.getAllContacts()
        this.getMyContacts()
      }
    )
  }
  getAccounts() {
    this.accountService.getAllAcc().subscribe(
      res => {
        this.accounts = res['payload']
      },
      err => {
        console.log(err)
      }
    )
  }

  getAllContacts() {
    this.contactService.getAllContact().subscribe(
      res => {
        console.log(res)
        this.allCons = res['payload']
      },
      err => {
        console.log(err)
      }
    )
  }

  getMyContacts() {
    this.contactService.getMyContact().subscribe(
      res => {
        this.myCons = res['payload']
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }

  getJunkContacts() {
    this.contactService.getJunkedContact().subscribe(
      res => {
        this.junkCons = res['payload']
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }

  getContactById(id) {
    this.isSelected = true;
    this.contactService.getContactById(id).subscribe(
      res => {
        this.theCons = res['payload']
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }

  junkaContact(id) {
    this.cContacts = []
    this.cContacts.push(id)
    this.contactService.ConvertContactToJunk(this.cContacts).subscribe(
      res => {
        if (res['hasErrors'] == true) {
          this.notification.publishMessages(res['description'], 'warning', 0)
        } else{
          this.jsuccess = true;
          this.getAllContacts()
          this.getMyContacts()
          this.getJunkContacts()
        }

      }
    )
  }
  reactivateContact(id) {
    this.cContacts = []
    this.cContacts.push(id)
    this.contactService.reactivateContact(this.cContacts).subscribe(
      res => {
        // this.rsuccess = true;
        this.getAllContacts()
        this.getMyContacts()
        this.getJunkContacts()
      }
    )
  }
  deleteContact(id) {
    this.contactService.deleteContact(id).subscribe(
      res => {
        // this.dsuccess = true;
        this.getAllContacts()
        this.getMyContacts()
        this.getJunkContacts()
      }
    )
  }



  openContact(id) {
    this.router.navigate(['/app/contacts/contact/' + id])
  }

  junkContact(id) {
    this.jContacts.push(id)
    this.contactService.ConvertContactToJunk(this.jContacts).subscribe(
      res => {
        this.jsuccess = true
      }
    )
  }

  closejSuccess() {
    this.jsuccess = false
  }
  closeiSuccess() {
    this.isuccess = false
  }

}
