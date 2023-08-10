import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CheckoutService } from '../checkout.service';
import { products } from '../products';

@Component({
  selector: 'app-laptops',
  templateUrl: './laptops.component.html',
  styleUrls: ['./laptops.component.css'],
})
export class LaptopsComponent implements OnInit {
  
  //products = [...products];
  prod: any[] = [];

  constructor(private http: HttpClient,
    private checkoutService: CheckoutService,){}

  ngOnInit():void {
    this.checkoutService.getproducts().subscribe((resultData: any)=>{
      this.prod = resultData.data});
      this.checkoutService.getproducts();
  }

  share() {
    window.alert('The product has been shared!');
  }

  
}