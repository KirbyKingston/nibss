import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery'
import { NotificationService } from 'src/core/classes/notification/notification.service';
import { AuthDataService } from 'src/core/data/authentication/auth-data.service';
import { ContactService } from 'src/core/data/contact/contact.service';
import { ProductsService } from 'src/core/data/products/products.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allProduct: any = [];
  myProduct: any = [];
  junkProduct: any = [];
  theProduct: any;
  cLeads: Array<{}> = [];
  isSelected: boolean = false;
  users: any;
  productLogo: any;
  documents: any;
  files:any;
  isuccess:boolean = false;
  nsuccess: boolean = false;
  constructor(private productService: ProductsService, private router: Router, private authService:AuthDataService, private notification: NotificationService) { }

  ngOnInit() {
    this.getAllProducts()
    this.getJunkProduct()
    this.getMyProduct()
    this.getUsers()
    $('#filter, #overlay').on('click', function () {
      $('.dropdown-menu.filter-drop, #overlay').toggleClass('show')
    })

    $('#more, #overlay').on('click', function () {
      $('.dropdown-menu.more-drop, #overlay').toggleClass('show')
    })
  }

  getUsers() {
    this.authService.getUsers().subscribe(
      res => {
        this.users = res['payload']
        // console.log(res)
      },
      err => {
        // console.log(err)
      }
    )
  }
  handleUpload(e: FileList) {
    this.productLogo = e[0];
    const size = e[0].size
    if (size >= 505000000) {
      this.notification.publishMessages('Please upload limit is 5mb', 'warning', 0)
      return false;
    }

  }
  uploadFile(e: FileList) {
    this.documents = e;
    console.log(this.documents)
    const size = e[0].size
    if (size >= 505000000) {
      return false;
    }
  }
  uploadProducts(e: FileList) {
    this.files = e[0];
    console.log(this.files)
    const size = e[0].size
    if (size >= 505000000) {
      return false;
    }
  }
  importProducts(){
    this.productService.importProduct(this.files).subscribe(
      res => {
        this.isuccess = true;
        this.getAllProducts()
        this.getMyProduct()
      }
    )
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(
      res => {
        this.allProduct = res['payload']
        this.allProduct.forEach(element => {
          element['checked'] = false;
        });
        console.log(this.allProduct)
      },
      err => {
        console.log(err)
      }
    )
  }

  getMyProduct() {
    this.productService.getMyProducts().subscribe(
      res => {
        this.myProduct = res['payload']

      },
      err => {
        console.log(err)
      }
    )
  }

  getJunkProduct() {
    this.productService.getJunkedProducts().subscribe(
      res => {
        this.junkProduct = res['payload']
      },
      err => {
        console.log(err)
      }
    )
  }


  getProduct(id) {
    this.isSelected = true;
    this.productService.getProductById(id).subscribe(
      res => {
        this.theProduct = res['payload']
      },
      err => {
        console.log(err)
      }
    )
  }

  openProduct(id) {
    this.router.navigate(['/app/products/product/' + id])
  }

  createProduct(form: NgForm) {
    this.productService.createProduct(form.value.category, form.value.description, form.value.fee, this.productLogo, form.value.manager, form.value.name, form.value.duration, form.value.tag, form.value.tax).subscribe(
      res => {
        this.notification.publishMessages('You have successfully created a new product', 'info', 0)
        this.nsuccess = true;
        this.getAllProducts();
      },
      err => {
      }
    )
  }

  closenSuccess() {
    this.nsuccess = false
  }
  closeiSuccess() {
    this.isuccess = false
  }

}
