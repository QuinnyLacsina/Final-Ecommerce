import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CheckoutService } from '../checkout.service';
import { checkout } from '../checkout';
import { publishFacade } from '@angular/compiler';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  //checkoutApi: string = 'http://localhost:3000/checkout';
  checkoutApi: string = 'http://localhost:3000';
  itemCheckoutApi: string = 'http://localhost:3000';
  checkouts:any;
  checkout: any[] = [];
  itemCheckout:any[] =[];
  items = this.checkoutService.getItems();
  totalPrice: number= 0;

  constructor(private http: HttpClient, 
    private checkoutService: CheckoutService,
    ){}



  getcheckout() {
    this.http.get(`${this.checkoutApi}/api/echeckout`)
    .subscribe((resultData: any)=>{
      this.checkouts = resultData.data;
      console.log("this.checkout: " +this.checkouts)
    })
    
  }
  
  getitemCheckout() {
    this.http.get(`${this.itemCheckoutApi}/api/eitems`)
    .subscribe((resultData: any)=>{
      this.itemCheckout = resultData.data;
      console.log("this.checkoutItems: " +this.itemCheckout) 
    })
    
  }

  //ID randomizer
  generateOrderId(length: number): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset[randomIndex];
    }
    return result;
  }

  getRandomOrderId(): string {
    const orderIdLength = 5; // You can adjust the length as needed
    return this.generateOrderId(orderIdLength);
  }
  //

  ngOnInit(): void {
    this.getcheckout();
    this.getitemCheckout();
  }

  

  onSubmit(id: number) {
    // Assuming you have the record ID
    
    this.checkoutService.setID(id);
        /*
        console.log('Update successful!', res);
        alert('UPDATED!!!');
        this.getcheckout();*/
      
    ;
  }

  

  onDelete(id: number) {
    this.checkoutService.deleteData(id).subscribe(
      (res) => {
        console.log('Deletion successful!', res);
        alert('DELETED!!!');
        this.getcheckout();
      }
    );
  }



  /*addCheckout(){
    let newCheckout = {
      "firstname": this.cFirstname,
      "lastmame": this.cLastname,
      "email": this.cEmail,
      "address": this.cAddress,
    }
    this.http.post(this.checkoutApi, newCheckout).subscribe ((res) =>{
      console.log(res);
      alert('new checkout added');
    })
  }*/

}
