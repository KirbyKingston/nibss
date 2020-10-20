import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery'
import { NotificationService } from 'src/core/classes/notification/notification.service';
import { AccountService } from 'src/core/data/account/account.service';
import { AuthDataService } from 'src/core/data/authentication/auth-data.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allAccounts: any = [];
  myAccounts: any = [];
  junkAccounts: any = [];
  theAccount: any;
  cAccount: Array<{}> = [];
  isSelected: boolean = false;
  jsuccess: boolean = false;
  nsuccess: boolean = false;
  rsuccess: boolean = false;
  dsuccess: boolean = false;
  nfObject;
  owner: any = '';
  accountname: any = '';
  insType: any = '';
  transVol: any = '';
  EstTransVal: any = '';
  comType: any = '';
  website: any = '';
  facebook: any = '';
  twitter: any = '';
  instagram: any = '';
  address: any = '';
  city: any = '';
  country: any = '';
  postalCode: any = '';
  ownerphoneNumber: any = '';
  disImage: any;
  yearEst: any = '';
  message: any = '';
  firstName: any = '';
  conphoneNumber: any = '';
  lastName: any = '';
  designation: any = '';
  title: any = '';
  email: any = '';
  types: any = '';
  users: any;
  files: any;
  selectedFiles: any;
  typeName: any = '';
  documentTypes = [
    { id: 0, document: "Others" },
    { id: 1, document: "Brochure" },
    { id: 2, document: "Picture" },
    { id: 3, document: "Presentation Slides" }
  ]
  docTypes: Array<{}> = [];
  selectedTypes: Array<{}> = [];
  p: number = 1;
  constructor(private accountService: AccountService, private router: Router, private notification: NotificationService, private authService:AuthDataService) { }

  ngOnInit() {
    this.getAllAccs()
    this.getMyAccs()
    this.getJunkAccs()
    this.getUsers()
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

  handleUpload(e: FileList) {
    this.disImage = e[0];
    const size = e[0].size
    if (size >= 505000000) {
      this.notification.publishMessages('Please upload limit is 5mb', 'warning', 0)
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

  
  getUsers(){
    this.authService.getUsers().subscribe(
      res => {
        this.users = res['payload']
      }
    )
  }
  getAllAccs() {
    this.accountService.getAllAcc().subscribe(
      res => {
        // console.log(res)
        this.allAccounts = res['payload']
        this.allAccounts = this.allAccounts.reverse()
        this.allAccounts.forEach(element => {
          element['checked'] = false;
        });
        console.log(this.allAccounts)
      },
      err => {
        console.log(err)
      }
    )
  }

  getMyAccs() {
    this.accountService.getMyAcc().subscribe(
      res => {
        this.myAccounts = res['payload']
        this.myAccounts = this.myAccounts.reverse()

        // console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }

  getJunkAccs() {
    this.accountService.getJunkedAcc().subscribe(
      res => {
        this.junkAccounts = res['payload']
        this.junkAccounts = this.junkAccounts.reverse()

        // console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }


  getAcc(id) {
    this.isSelected = true;
    this.accountService.getAccById(id).subscribe(
      res => {
        this.theAccount = res['payload']
        this.nfObject = new Intl.NumberFormat("en-US");
        this.theAccount.transactionVolume = this.nfObject.format(this.theAccount.transactionVolume);
        // console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }


  openAccount(id) {
    this.router.navigate(['/app/accounts/account/' + id])
  }
  openContact(id) {
    this.router.navigate(['/app/contacts/contact/' + id])
  }
  junkAccount(id) {
    this.cAccount.push(id)
    this.accountService.ConvertAccToJunk(this.cAccount).subscribe(
      res => {
        if (res['hasErrors'] == false) {
          this.jsuccess = true;
          this.getAllAccs()
          this.getMyAccs()
          this.getJunkAccs()
        } else {
          this.notification.publishMessages(res['description'], 'warning', 0)
        }


      }
    )
  }
  reactivateAccount(id) {
    this.cAccount.push(id)
    this.accountService.reactivateAcc(this.cAccount).subscribe(
      res => {
        this.rsuccess = true;
        this.getAllAccs()
        this.getMyAccs()
        this.getJunkAccs()
      }
    )
  }
  deleteAccount(id) {
    this.accountService.deleteAcc(id).subscribe(
      res => {
        this.dsuccess = true;
        this.getAllAccs()
        this.getMyAccs()
        this.getJunkAccs()
      }
    )
  }

  createAccount() {
    this.transVol = this.transVol.replace(/,/g, '')
    this.EstTransVal = this.EstTransVal.replace(/,/g, '')
    this.accountService.createAcc(this.accountname, this.disImage, this.EstTransVal, this.facebook, this.instagram, this.insType, this.owner, this.ownerphoneNumber, this.transVol, this.twitter, this.website, this.yearEst, this.city, this.country, this.address, this.postalCode, this.email, this.firstName, this.lastName, this.designation, this.title, this.conphoneNumber, this.message).subscribe(
      res => {
        console.log(res)
        this.getAllAccs()
        this.getMyAccs()
      }
    )
  }
  closejSuccess() {
    this.jsuccess = false
  }
  closenSuccess() {
    this.nsuccess = false
  }

  closerSuccess() {
    this.rsuccess = false
  }
  closedSuccess() {
    this.dsuccess = false
  }

}
