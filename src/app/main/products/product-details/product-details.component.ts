import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery'
import { NotificationService } from 'src/core/classes/notification/notification.service';
import { AuthDataService } from 'src/core/data/authentication/auth-data.service';
import { ProductsService } from 'src/core/data/products/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id: any;
  productDetail: any;
  noteMessage: any = '';
  comName: any = '';
  users: any;
  productLogo: any;
  constructor(private location: Location, private notification: NotificationService, private route: ActivatedRoute, private productService: ProductsService, private authService: AuthDataService) { }

  ngOnInit() {
    this.getId()
    this.getProduct()
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

    $("input.money").keyup(function (event) {
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


  }
  handleUpload(e: FileList) {
    this.productLogo = e[0];
    const size = e[0].size
    if (size >= 505000000) {
      this.notification.publishMessages('Please upload limit is 5mb', 'warning', 0)
      return false;
    }

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

  getProduct() {
    this.productService.getProductById(this.id).subscribe(
      res => {
        console.log(res)
        this.productDetail = res['payload']
      },
      err => {
        console.log(err)
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

  editProduct() {
    this.productService.updateProduct(this.productDetail.category, this.productDetail.description, this.productDetail.fee, this.productDetail.id, this.productDetail.name, this.productDetail.duration, this.productDetail.tag, this.productDetail.tax).subscribe(
      res => {
        this.getProduct()
      },
      err => { }
    )
  }
  createNote(id) {
    this.productService.addNote(id, this.noteMessage).subscribe(
      res => {
        console.log(res)
        this.noteMessage = ""
        this.getProduct()
      }
    )
  }

  addCompetition(id) {
    this.productService.addCompetitor(id, this.comName).subscribe(
      res => {
        console.log(res)
        this.comName = ""
        this.getProduct()
      }
    )
  }
}
