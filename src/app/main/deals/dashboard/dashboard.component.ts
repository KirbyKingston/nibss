import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery'
import { AccountService } from 'src/core/data/account/account.service';
import { AuthDataService } from 'src/core/data/authentication/auth-data.service';
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
  users: any;
  dropdownList = [];
  selectedItems: Array<{}> = [];
  dropdownSettings = {};
  isSelected: boolean = false;
  account: any = '';
  contact: any = '';
  name: any = '';
  dealValue: any = '';
  closeDate: any = '';
  estIncome: any = '';
  owner: any = '';
  probability: any = '';
  stage: any = '';
  status: any = '';
  note: any = '';

  cDeals: Array<{}> = [];
  option: any = '';
  newLead1: boolean = true;
  newLead2: boolean = false;
  newLead3: boolean = false;
  jsuccess: boolean = false;
  isuccess: boolean = false;
  nsuccess: boolean = false;
  rsuccess: boolean = false;
  dsuccess: boolean = false;
  constructor(private router: Router, private authService: AuthDataService, private dealService: DealsService, private productService: ProductsService, private accountService: AccountService) { }

  ngOnInit() {
    this.getAllDeals()
    this.getJunkedDeals()
    this.getMyDeals()
    this.getProducts()
    this.getAccounts()
    // this.getContacts()
    this.getUsers()
    $('#filter, #overlay').on('click', function () {
      $('.dropdown-menu.filter-drop, #overlay').toggleClass('show')
    })

    $('#more, #overlay').on('click', function () {
      $('.dropdown-menu.more-drop, #overlay').toggleClass('show')
    })


    $("input.money").keyup(function(event) {
      if (event.which >= 37 && event.which <= 40) {
        event.preventDefault();
      }
      var $this = $(this);
      var num = $this
        .val()
        .replace(/,/gi, "")
        .split("")
        .reverse()
        .join("");

      var num2 = RemoveRougeChar(
        num
          .replace(/(.{3})/g, "$1,")
          .split("")
          .reverse()
          .join("")
      );
      $this.val(num2);
    });

    function RemoveRougeChar(convertString) {
      if (convertString.substring(0, 1) == ",") {
        return convertString.substring(1, convertString.length);
      }
      return convertString;
    }

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id', 
      textField: 'product',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
  }

  checked(event) {
    if (event === true) {
      this.isSelected = true;

    } else {
      this.isSelected = false;
    }
  }
  uploadFile(e: FileList) {
    this.files = e[0];
    console.log(this.files)
    const size = e[0].size
    if (size >= 505000000) {
      return false;
    }
  }

  importDeals() {
    this.dealService.importDeal(this.files).subscribe(
      res => {
        this.isuccess = true;
        this.getAllDeals()
        this.getMyDeals()
      }
    )
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
    this.isSelected = true;

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
  getAccountById(){
    this.accountService.getAccById(this.account).subscribe(
      res => {
        this.contacts = res['payload']['contacts']
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

  junkDeal(id) {
    this.cDeals.push(id)
    this.dealService.ConvertDealToJunk(this.cDeals).subscribe(
      res => {
        this.jsuccess = true;
        this.getAllDeals()
        this.getMyDeals()
        this.getJunkedDeals()
      }
    )
  }
  reactivateDeal(id) {
    this.cDeals.push(id)
    this.dealService.reactivateDeal(this.cDeals).subscribe(
      res => {
        this.rsuccess = true;
        this.getAllDeals()
        this.getMyDeals()
        this.getJunkedDeals()
      }
    )
  }
  deleteDeal(id) {
    this.dealService.deleteDeal(id).subscribe(
      res => {
        this.dsuccess = true;
        this.getAllDeals()
        this.getMyDeals()
        this.getJunkedDeals()
      }
    )
  }


  openDeal(id) {
    this.router.navigate(['/app/deals/deal/' + id])
  }
  openContact(id) {
    this.router.navigate(['/app/contacts/contact/' + id])
  }
  openProduct(id) {
    this.router.navigate(['/app/products/product/' + id])
  }
  openAccount(id) {
    this.router.navigate(['/app/accounts/account/' + id])
  }
  createDeal() {
    let arr = []
    this.products.forEach(element => {
      arr.push(element.id)
    })
    this.selectedItems = arr
    console.log(arr)

    this.dealService.createDeal(this.account, this.contact, this.name, this.dealValue, this.closeDate, this.estIncome, this.owner, this.probability, this.stage, this.status, this.note, this.selectedItems).subscribe(
      res => {
        this.nsuccess = true;
        this.getAllDeals()
        this.getMyDeals()
        this.getJunkedDeals()
      }
    )

  }

  closenSuccess() {
    this.nsuccess = false
  }
  closeiSuccess() {
    this.isuccess = false
  }
  closejSuccess() {
    this.jsuccess = false
  }


  closerSuccess() {
    this.rsuccess = false
  }
  closedSuccess() {
    this.dsuccess = false
  }
}
