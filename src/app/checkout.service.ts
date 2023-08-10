import { HttpClient } from '@angular/common/http';
import { Product } from './products';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  items: any[] = [];
  idNum: any = 0;
  checkoutApi: string = 'http://localhost:3000/api/echeckout';
  productApi: string = 'http://localhost:3000';
  itemCheckoutApi: string = 'http://localhost:3000/api/eitems';
  eProducts:any;

  constructor(private http: HttpClient) {}

  addToCart(product: Product) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }
   setID(id: any){
    this.idNum = id;
    
   }

   getId(): Observable<any> {
    return this.idNum;
   }

  clearCart() {
    this.items = [];
    return this.items;

  }
 
 addCheckout(data: any){
    return this.http.post(this.checkoutApi + '/add', data);
  }

  getproducts() {
    return this.http.get(`${this.productApi}/api/eproduct`);
    
  }

  getproductId(id:any){
    return this.http.get(`${this.productApi}/${id}`);
  }

  additems(data: any){
    return this.http.post(this.itemCheckoutApi + '/add', data);
  }

  
  getShippingPrices() {
    return this.http.get<{ type: string; price: number }[]>(
      '/assets/shipping.json'
    );
  }

  updateData(id: any, newData: any): Observable<any> {
    return this.http.put(`${this.checkoutApi}/${id}`, newData);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.checkoutApi}/${id}`);
  }

  /*updateCheckout(id:number, data:any): Observable<any>{
    return this.http.put(`http://localhost:3000/api/echeckout${id}`, data);
  }*/

}