import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CheckoutService } from '../checkout.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  items = this.checkoutService.getItems();
  totalPrice: number= 0;
  updateForm:FormGroup;
  idNum: any;
  data: any;
  checkoutApi: string = 'http://localhost:3000';
  checkouts:any;

  constructor(private http: HttpClient, 
    private checkoutService: CheckoutService,
    private formBuilder: FormBuilder
    //@Inject(MAT_DIALOG_DATA) public data: any,
    ){this.updateForm = this.formBuilder.group({
      ideCheckout: ['', Validators.required], 
      firstname: ['', Validators.required], 
      lastname: ['', Validators.required],
      address: ['', Validators.required], 
      email: ['', Validators.required], 
      deliveryType: ['', Validators.required], 
      deliveryPrice: ['', Validators.required], 
  
    });}

    getcheckout() {
      this.http.get(`${this.checkoutApi}/api/echeckout`)
      .subscribe((resultData: any)=>{
        this.checkouts = resultData.data;
        console.log("this.checkoutItems: " +this.checkouts)
      })
      
    }

    onSubmit() {
      // Assuming you have the record ID
      if(this.updateForm.get('deliveryType')?.value == 'Same Day'){
        console.log("sam,e dayt - 850")
        this.updateForm.get('deliveryPrice')?.setValue('₱850.00')
      } else if (this.updateForm.get('deliveryType')?.value == '2-Day'){
        this.updateForm.get('deliveryPrice')?.setValue('₱550.00')
      } else if (this.updateForm.get('deliveryType')?.value == 'Regular'){
        this.updateForm.get('deliveryPrice')?.setValue('₱59.00')
      } 
      let updatedData = this.updateForm.value;
      this.checkoutService.updateData(this.idNum, updatedData).subscribe(
        (res) => {
          console.log('Update successful!', res);
          alert('UPDATED!!!');
          this.getcheckout();
        }
      );
    }

    ngOnInit(): void {
      this.idNum = this.checkoutService.getId();
      console.log(this.idNum);
      this.shippingCosts = this.checkoutService.getShippingPrices();
      this.totalPrice = this.items.reduce((acc, curr) => acc + curr.price, 0);
    }
  /*onSubmit(): void {
    let data = this.updateForm.value;
    this.items = this.checkoutService.clearCart();
    this.checkoutService.addCheckout(data).subscribe((res:any) =>{
      console.log(res);
      alert('new checkout added');
    });
    console.warn('Your order has been submitted', this.updateForm.value);
    console.log(this.updateForm);
    this.updateForm.reset();
    //this.totalPrice = 0;
  }*/
  
  /*onSubmit(id: number, updatedData: any) {
    // Assuming you have the record ID
  
    this.checkoutService.updateData(id, updatedData).subscribe(
      (res) => {
        console.log('Update successful!', res);
        alert('UPDATED!!!');
        this.getcheckout();
      }
    );
  }*/

  shippingCosts!: Observable<{ type: string; price: number }[]>;

  /*ngOnInit(): void {
    this.shippingCosts = this.checkoutService.getShippingPrices();
    this.totalPrice = this.items.reduce((acc, curr) => acc + curr.price, 0);
  }*/

}
