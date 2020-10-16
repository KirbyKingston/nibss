import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery'
import { ProductsService } from 'src/core/data/products/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id: any;
  productDetail: any;
  noteMessage:any = '';
  comName: any = '';
  constructor(private location: Location, private route: ActivatedRoute, private productService: ProductsService) { }

  ngOnInit() {
    this.getId()
    this.getProduct()
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

  createNote(id){
    this.productService.addNote(id, this.noteMessage).subscribe(
      res => {
        console.log(res)
        this.noteMessage = ""
        this.getProduct()
      }
    )
  }

  addCompetition(id){
    this.productService.addCompetitor(id, this.comName).subscribe(
      res => {
        console.log(res)
        this.comName = ""
        this.getProduct()
      }
    )
  }
}
