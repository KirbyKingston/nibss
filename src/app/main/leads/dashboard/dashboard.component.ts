import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery'
import { NotificationService } from 'src/core/classes/notification/notification.service';
import { AuthDataService } from 'src/core/data/authentication/auth-data.service';
import { ContactService } from 'src/core/data/contact/contact.service';
import { LeadsService } from 'src/core/data/leads/leads.service';
import { ProductsService } from 'src/core/data/products/products.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allLeads: any = [];
  myLeads: any = [];
  junkLeads: any = [];
  theLead: any;
  cLeads: Array<{}> = [];
  isSelected: boolean = false;
  selectedLeads: any;
  leadIds: any;
  users: any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  selectedProducts: Array<{}> = []
  products: any = '';
  owner: any = '';
  source: any = '';
  stage: any = '';
  status: any = '';
  phoneNumber: any = '';
  company: any = '';
  insType: any = '';
  transVol: any = '';
  EstTransVal: any = '';
  comType: any = '';
  website: any = '';
  facebook: any = '';
  twitter: any = '';
  instagram: any = '';
  title: any = '';
  address: any = '';
  city: any = '';
  country: any = '';
  postalCode: any = '';
  firstName: any = '';
  ownerphoneNumber: any = '';
  lastName: any = '';
  designation: any = '';
  email: any = '';
  disImage: any;
  yearEst: any = '';
  message: any = '';
  csuccess: boolean = false;
  jsuccess: boolean = false;
  isuccess: boolean = false;
  nsuccess: boolean = false;
  rsuccess: boolean = false;
  dsuccess: boolean = false;
  info: boolean = true;
  profile: boolean = false;
  social: boolean = false;
  files: any;
  nfObject;
  constructor(private leadService: LeadsService, private router: Router, private notification: NotificationService, private authService: AuthDataService, private productService: ProductsService) { }

  ngOnInit() {
    this.getAllLeads();
    this.getMyLeads();
    this.getJunkLeads();
    this.getProducts();
    this.getUsers();
    this.fetchSelectedItems()
    this.fetchCheckedIDs()

    $(document).ready(function () {
      $('.btnNext').click(function () {
        $('.nav-tabs .active').parent().next('li').find('a').trigger('click');
      });

      $('.btnPrevious').click(function () {
        $('.nav-tabs .active').parent().prev('li').find('a').trigger('click');
      });
    });

    // $('.btnNext').click(function () {
    //   $('.nav-tabs.prod > li.nav-item > a.nav-link.active').parent().next('li').find('a.nav-link').trigger('click');
    // });

    // $('.btnPrevious').click(function () {
    //   $('.nav-tabs.prod > li.nav-item > a.nav-link.active').parent().prev('li').find('a.nav-link').trigger('click');
    // });


    $('#filter, #overlay').on('click', function () {
      $('.dropdown-menu.filter-drop, #overlay').toggleClass('show')
    })

    $('#more, #overlay').on('click', function () {
      $('.dropdown-menu.more-drop, #overlay').toggleClass('show')
    })

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
  handleUpload(e: FileList) {
    this.disImage = e[0];
    const size = e[0].size
    if (size >= 505000000) {
      this.notification.publishMessages('Please upload limit is 5mb', 'warning', 0)
      return false;
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
  importLeads() {
    this.leadService.importLeads(this.files).subscribe(
      res => {
        this.isuccess = true;
        this.getAllLeads()
        this.getMyLeads()
      }
    )
  }
  getUsers() {
    this.authService.getUsers().subscribe(
      res => {
        this.users = res['payload']['users']
      },
      err => {
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
      },
      err => {
      }
    )
  }
  getAllLeads() {
    this.leadService.getAllLeads().subscribe(
      res => {
        this.allLeads = res['payload']
        this.allLeads.forEach(element => {
          element['checked'] = false;
        });
      },
      err => {
      }
    )
  }

  getMyLeads() {
    this.leadService.getMyLeads().subscribe(
      res => {
        this.myLeads = res['payload']
      },
      err => {
      }
    )
  }

  getJunkLeads() {
    this.leadService.getJunkedLeads().subscribe(
      res => {
        this.junkLeads = res['payload']
      },
      err => {
      }
    )
  }


  getLead(id) {
    this.isSelected = true;
    this.leadService.getLeadById(id).subscribe(
      res => {
        this.theLead = res['payload']

        this.nfObject = new Intl.NumberFormat("en-US");
        this.theLead.transactionVolume = this.nfObject.format(this.theLead.transactionVolume);
        this.theLead.estimatedTransactionValue = this.nfObject.format(this.theLead.estimatedTransactionValue);
      },
      err => {
      }
    )
  }

  convertToDeal(id) {
    this.cLeads = []
    this.cLeads.push(id)
    this.leadService.ConvertLeadToDeal(this.cLeads).subscribe(
      res => {
        this.csuccess = true;
        this.getAllLeads()
        this.getMyLeads()
        this.getJunkLeads()

      }
    )
  }
  junkLead(id) {
    this.cLeads = []
    this.cLeads.push(id)
    this.leadService.junkLead(this.cLeads).subscribe(
      res => {
        this.jsuccess = true;
        this.getAllLeads()
        this.getMyLeads()
        this.getJunkLeads()
        this.getLead(id)
      }
    )
  }
  reactivateLead(id) {
    this.cLeads = []
    this.cLeads.push(id)
    this.leadService.reactivateJunkedLead(this.cLeads).subscribe(
      res => {
        this.rsuccess = true;
        this.getAllLeads()
        this.getMyLeads()
        this.getJunkLeads()
        this.getLead(id)
      }
    )
  }
  deleteLead(id) {
    this.leadService.deleteLead(id).subscribe(
      res => {
        this.dsuccess = true;
        this.getAllLeads()
        this.getMyLeads()
        this.getJunkLeads()
      }
    )
  }

  openLead(id) {
    this.router.navigate(['/app/leads/lead/' + id])
  }

  openContact(id) {
    this.router.navigate(['/app/contacts/contact/' + id])
  }


  changeSelection() {
    this.fetchSelectedItems()
  }

  fetchSelectedItems() {
    this.selectedLeads = this.allLeads.filter((value, index) => {
      return value.checked
    });
  }

  fetchCheckedIDs() {
    this.leadIds = []
    this.allLeads.forEach((value, index) => {
      if (value.checked) {
        this.leadIds.push(value.id);
        console.log(this.leadIds)
      }
    });
  }


  createLead() {
    let arr = []
    if (this.products) {
      arr = this.products.map(element => element.id)
    } else {
      arr = []
    }
    this.transVol = this.transVol.replace(/,/g, '')
    this.selectedProducts.push(arr)
    this.leadService.createLead(this.company, this.disImage, this.EstTransVal, this.facebook, this.instagram, this.insType, this.owner, this.ownerphoneNumber, this.source, this.stage, this.status, this.transVol, this.twitter, this.website, this.yearEst, this.city, this.country, this.address, this.postalCode, this.email, this.firstName, this.lastName, this.designation, this.title, this.phoneNumber, this.message, this.selectedProducts).subscribe(
      res => {
        if (res['hasErrors'] == true) {
          this.notification.publishMessages(res['description'], 'warning', 0)

        } else {
          this.notification.publishMessages('You have successfully created a new lead', 'info', 0)
          this.nsuccess = true;
          this.getAllLeads();
        }

      },
      err => {
        // console.log(err)
      }
    )

  }

  gotoProfile(){
    this.info = false;
    this.profile = true;
    this.social = false;
  }
  gotoInfo(){
    this.info = true;
    this.profile = false;
    this.social = false;
  }
  gotoSocial(){
    this.info = false;
    this.profile = false;
    this.social = true;
  }
  closecSuccess() {
    this.csuccess = false
    this.router.navigate(['/app/deals'])
  }

  closejSuccess() {
    this.jsuccess = false
  }

  closenSuccess() {
    this.nsuccess = false
  }
  closeiSuccess() {
    this.isuccess = false
  }
  closerSuccess() {
    this.rsuccess = false
  }
  closedSuccess() {
    this.dsuccess = false
  }
}
