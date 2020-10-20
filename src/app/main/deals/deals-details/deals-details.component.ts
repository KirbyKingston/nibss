import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery'
import { parse } from 'querystring';
import { AccountService } from 'src/core/data/account/account.service';
import { AuthDataService } from 'src/core/data/authentication/auth-data.service';
import { ContactService } from 'src/core/data/contact/contact.service';
import { DealsService } from 'src/core/data/deals/deals.service';
import { ProductsService } from 'src/core/data/products/products.service';

@Component({
  selector: 'app-deals-details',
  templateUrl: './deals-details.component.html',
  styleUrls: ['./deals-details.component.css']
})
export class DealsDetailsComponent implements OnInit {
  id: any;
  dealDetails: any;
  accounts: any;
  users: any;
  contacts: any;
  products: any;
  account: any = '';
  owner: any = '';
  contact: any = '';
  noteMessage: any = '';
  dealStage: any = '';
  dealStatus: any = '';
  comName:any = '';
  theProduct: any = '';
  addedPs: Array<{}> = [];
  dropdownList = [];
  selectedItems: Array<{}> = [];
  dropdownSettings = {};
  csuccess: boolean = false;
  jsuccess: boolean = false;
  esuccess: boolean = false;
  ssuccess: boolean = false;
  usuccess: boolean = false;
  constructor(private location: Location, private route: ActivatedRoute, private productService:ProductsService, private dealService: DealsService, private accountService:AccountService, private authService:AuthDataService, private contactService:ContactService) { }

  ngOnInit() {
    this.getId()
    this.getDeal()
    this.getAccounts()
    // this.getContacts()
    this.getProducts()
    this.getUsers()
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

    $(".money").keyup(function (event) {

      // skip for arrow keys
      if (event.which >= 37 && event.which <= 40) return;

      // format number
      $(this).val(function (index, value) {
        return value
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          ;
      });

      var firstValue = Number($('.money').val().replace(/,/g, ''));
      console.log(firstValue);
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

  getDeal() {
    this.dealService.getDealById(this.id).subscribe(
      res => {
        this.dealDetails = res['payload']
        let nfObject = new Intl.NumberFormat("en-US");
        this.dealDetails.estimatedRevenue = nfObject.format(this.dealDetails.estimatedRevenue);
        this.dealDetails.dealValue = nfObject.format(this.dealDetails.dealValue);
      },
      err => {
      }
    )
  }

  getProducts() {
    this.productService.getAllProducts().subscribe(
      res => {
        this.products = res['payload']
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
    this.accountService.getAccById(this.dealDetails.account.id).subscribe(
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
  createNote(id){
    this.dealService.addNote(id, this.noteMessage).subscribe(
      res => {
        console.log(res)
      }
    )
  }

  addProductTodeal(id){
    this.theProduct = parseInt(this.theProduct)
    this.addedPs.push(this.theProduct)
    this.dealService.addProductToDeal(id, this.addedPs).subscribe(
      res => {
        this.getDeal()
        this.theProduct = '';
      }
    )
  }
  

  updateStage(){
    if (this.dealDetails.stage == "Negotiation") {
      this.dealStage = 0
    } else if (this.dealDetails.stage == "Proposal") {
      this.dealStage = 1
    } else if (this.dealDetails.stage == "Identification") {
      this.dealStage = 2
    } else if (this.dealDetails.stage == "Value Proposition") {
      this.dealStage = 3
    } else if (this.dealDetails.stage == "Needs Analysis") {
      this.dealStage = 4
    } else if (this.dealDetails.stage == "Qualification") {
      this.dealStage = 5
    } else if (this.dealDetails.stage == "Won") {
      this.dealStage = 6
    } else if (this.dealDetails.stage == "Lost") {
      this.dealStage = 7
    } else if (this.dealDetails.stage == "Lost to Competition") {
      this.dealStage = 8
    } 

    if (this.dealDetails.status == "Active") {
      this.dealStatus = 0
    } else if (this.dealDetails.status == "Inactive") {
      this.dealStatus = 1
    }

    this.dealService.updateStage(this.dealDetails.account.id, this.dealDetails.account.contacts[0].id, this.dealDetails.dealName, this.dealDetails.dealValue, this.dealDetails.expectedClosingDate, this.dealDetails.estimatedRevenue, this.dealDetails.id, this.dealDetails.probability, this.dealStage, this.dealStatus).subscribe(
      res => {
        this.ssuccess = true;
        this.getDeal()
      }
    )
  }

  updateDeal(){
    if (this.dealDetails.stage == "Negotiation") {
      this.dealStage = 0
    } else if (this.dealDetails.stage == "Proposal") {
      this.dealStage = 1
    } else if (this.dealDetails.stage == "Identification") {
      this.dealStage = 2
    } else if (this.dealDetails.stage == "Value Proposition") {
      this.dealStage = 3
    } else if (this.dealDetails.stage == "Needs Analysis") {
      this.dealStage = 4
    } else if (this.dealDetails.stage == "Qualification") {
      this.dealStage = 5
    } else if (this.dealDetails.stage == "Won") {
      this.dealStage = 6
    } else if (this.dealDetails.stage == "Lost") {
      this.dealStage = 7
    } else if (this.dealDetails.stage == "Lost to Competition") {
      this.dealStage = 8
    } 

    if (this.dealDetails.status == "Active") {
      this.dealStatus = 0
    } else if (this.dealDetails.status == "Inactive") {
      this.dealStatus = 1
    }

    this.dealDetails.dealValue = this.dealDetails.dealValue.replace(/,/g, '')
    this.dealDetails.estimatedRevenue = this.dealDetails.estimatedRevenue.replace(/,/g, '')
    this.dealService.updateDeal(this.dealDetails.account.id, this.contact, this.dealDetails.dealName, this.dealDetails.dealValue, this.dealDetails.expectedClosingDate, this.dealDetails.estimatedRevenue, this.dealDetails.id, this.owner, this.dealDetails.probability, this.dealStage, this.dealStatus ).subscribe(
      res => {
        this.usuccess = true;
        this.getDeal()
      }
    )
  }

  addCompetition(id){
    this.dealService.addCompetitor(id, this.comName).subscribe(
      res => {
        console.log(res)
        this.comName = ""
        this.getDeal()
      }
    )
  }

  closeeSuccess() {
    this.esuccess = false
  }
  closecSuccess() {
    this.csuccess = false
  }

  closejSuccess() {
    this.jsuccess = false
  }
  closeuSuccess() {
    this.usuccess = false
  }
  closesSuccess() {
    this.ssuccess = false
  }


}
