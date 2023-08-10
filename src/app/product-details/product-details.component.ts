import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product, products } from '../products';
import { CheckoutService } from '../checkout.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  //roducts: Product[] = products;
  prod: any[] = [];

  
  /*products = [...products];*/
  
  constructor(
    private route: ActivatedRoute,
    private checkoutService: CheckoutService,
    private http: HttpClient,
  ) {}
  
  ideProduct: number = 0;

  ngOnInit():void {
   
    const routeParams = this.route.snapshot.paramMap;
    this.ideProduct = Number(routeParams.get('ideProduct'));

    this.checkoutService.getproducts().subscribe((resultData: any)=>{
      this.prod = resultData.data;
    })
    
    this.prod.find(
      (product) => product.id === this.ideProduct
    );
    this.checkoutService.getproducts();
  }

  

  addToCart(product: Product) {
    this.checkoutService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }
}