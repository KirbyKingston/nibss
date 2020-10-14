import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery'
import { AccountService } from 'src/core/data/account/account.service';
import { AuthDataService } from 'src/core/data/authentication/auth-data.service';
import { ContactService } from 'src/core/data/contact/contact.service';
import { DealsService } from 'src/core/data/deals/deals.service';
import { ProductsService } from 'src/core/data/products/products.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  files: any;
  allDeals: any;
  myDeals: any;
  junkDeals: any;
  aDeal: any;
  products: any;
  accounts: any;
  contacts: any;
  users:any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  constructor(private router:Router, private authService:AuthDataService, private dealService: DealsService, private productService: ProductsService, private accountService: AccountService, private contactService: ContactService) { }

  ngOnInit() {
    this.getAllDeals()
    this.getJunkedDeals()
    this.getMyDeals()
    this.getProducts()
    this.getAccounts()
    this.getContacts()
    this.getUsers()
    $('#filter, #overlay').on('click', function () {
      $('.dropdown-menu.filter-drop, #overlay').toggleClass('show')
    })

    $('#more, #overlay').on('click', function () {
      $('.dropdown-menu.more-drop, #overlay').toggleClass('show')
    })

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'product',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
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

  getAllDeals() {
    this.dealService.getAllDeal().subscribe(
      res => {
        this.allDeals = res['payload']
      }
    )
  }
  getMyDeals() {
    this.dealService.getMyDeal().subscribe(
      res => {
        this.myDeals = res['payload']
      }
    )
  }
  getJunkedDeals() {
    this.dealService.getJunkedDeal().subscribe(
      res => {
        this.junkDeals = res['payload']
      }
    )
  }
  getDealById(id) {
    this.dealService.getDealById(id).subscribe(
      res => {
        this.aDeal = res['payload']
      }
    )
  }
  getProducts() {
    this.productService.getAllProducts().subscribe(
      res => {
        let arrayUsers = res['payload'];
        let arr = [];
        arrayUsers.forEach(item => {
          arr.push({
            product: item.productName,
            id: item.id
          });
        });
        this.dropdownList = arr;
      }
    )
  }
  getAccounts() {
    this.accountService.getAllAcc().subscribe(
      res => {
        this.accounts = res['payload']
      }
    )
  }
  getContacts() {
    this.contactService.getAllContact().subscribe(
      res => {
        this.contacts = res['payload']
      }
    )
  }

  getUsers() {
    this.authService.getUsers().subscribe(
      res => {
        this.users = res['payload']
      }
    )
  }

  openDeal(id) {
    this.router.navigate(['/app/deals/deal/' + id])
  }

  createDeal() {
    let arr = []
    arr = this.products.map(element => element.id)
  }
}
