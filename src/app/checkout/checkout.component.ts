import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CheckoutService } from '../checkout.service';
import { checkout } from '../checkout';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  items = this.checkoutService.getItems();
  totalPrice: number= 0;
  checkoutForm:FormGroup;
  prod: any[] = [];
  itemsForm:FormGroup;
  code: string ='';
  // data: any;
  // type: any;
  // price: any;
  
  checkout = [...checkout];

  constructor(
    private checkoutService: CheckoutService,
    private formBuilder: FormBuilder
  ) {this.checkoutForm = this.formBuilder.group({
    ideCheckout: ['', Validators.required], 
    firstname: ['', Validators.required], 
    lastname: ['', Validators.required],
    address: ['', Validators.required], 
    email: ['', Validators.required], 
    deliveryType: ['', Validators.required], 
    deliveryPrice: ['', Validators.required], 
    orderId: ['']

  }); this.itemsForm = this.formBuilder.group({
    checkoutPrice: ['', Validators.required], 
    checkoutItems: ['', Validators.required],
    orderId: ['']
  }); } 

  // findItemById(idToFind: number) {
  //   const foundItem = this.items.find(item => item.id === idToFind);
  //   if (foundItem) {
  //     console.log(`Item found: ${foundItem.name}`);
  //   } else {
  //     console.log('Item not found');
  //   }
  // }
  
  cItemsValue: string[] = [];
  cPriceValue: number[] = [];
  
  onSubmit(): void {
    const del_type = this.checkoutForm.get('deliveryType')?.value;
   

    /*
    if(this.checkoutForm.get('deliveryType')?.value == 'Same Day'){
      this.checkoutForm.get('deliveryPrice')?.setValue('₱850.00')
    } else if (this.checkoutForm.get('deliveryType')?.value == '2-Day'){
      this.checkoutForm.get('deliveryPrice')?.setValue('₱550.00')
    } else if (this.checkoutForm.get('deliveryType')?.value == 'Regular'){
      this.checkoutForm.get('deliveryPrice')?.setValue('₱59.00')
    } */

    if(del_type == 'Same Day'){
      this.checkoutForm.get('deliveryPrice')?.setValue('₱850.00')
    } else if (del_type== '2-Day'){
      this.checkoutForm.get('deliveryPrice')?.setValue('₱550.00')
    } else if (del_type == 'Regular'){
      this.checkoutForm.get('deliveryPrice')?.setValue('₱59.00')
    }

    for (let i of this.items) {
      console.log('test')
      this.cItemsValue.push(i.name)
      this.cPriceValue.push(i.price)
    }

    /*checkoutPrice
    console.log(`Checkout Price Value: ${this.cPriceValue}`);
    //checkoutItems
    console.log(`Checkout Item Value: ${this.cItemsValue}`);*/
    this.checkoutService.getproducts().subscribe((resultData: any)=>{
      this.prod = resultData.data;
    })
    console.log(this.items);
    let index = 0;

    //orderId checkoutForm
    const cOrderId = this.generateOrderId();
 
    this.checkoutForm.get('orderId')?.setValue(cOrderId);


    //orderId itemsForm
    this.itemsForm.get('orderId')?.setValue(cOrderId);
    for(const key in this.items){
    const desiredPrice: string = 'price';
    const c_price: string = this.items[index][desiredPrice];
    const desiredItem: string = 'name';
    const c_item: string = this.items[index][desiredItem];
    

    this.itemsForm.get('checkoutPrice')?.setValue(c_price);
    this.itemsForm.get('checkoutItems')?.setValue(c_item);

    let itemData = this.itemsForm.value;
    this.checkoutService.additems(itemData).subscribe((res:any) =>{
      console.log(res);
      alert('new items added');
      
    });    console.log(`Order Id: ${cOrderId}`);
    console.log(`Items Price: ${c_price}`);
    console.log(`Items Name: ${c_item}`);
    index++;}

    
    //this.itemForm.get('cItems').setValue()

    let data = this.checkoutForm.value;
    
    this.checkoutService.addCheckout(data).subscribe((res:any) =>{
      console.log(res);
      alert('new checkout added');
      
    });

    console.warn('Your order has been submitted', this.checkoutForm.value);
    console.log(this.checkoutForm);
    this.items = this.checkoutService.clearCart();
    this.checkoutForm.reset();
    this.totalPrice = 0;

  }

  //ID randomizer
  generateOrderId(): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset[randomIndex];
    }
    this.code = result;
    return result;
  }

  //delete
  onDelete(): void {
    this.items = this.checkoutService.clearCart();
    this.totalPrice = 0;
  }
  
  shippingCosts!: Observable<{ type: string; price: number }[]>;

  ngOnInit(): void {
    console.log(this.items);
    this.shippingCosts = this.checkoutService.getShippingPrices();
    this.totalPrice = this.items.reduce((acc, curr) => acc + curr.price, 0);
  }
  
}