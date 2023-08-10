import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LaptopsComponent } from './laptops/laptops.component';
import { PeripheralsComponent } from './peripherals/peripherals.component';
import { SmartphonesComponent } from './smartphones/smartphones.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { CheckoutComponent } from './checkout/checkout.component';

import { ProductDetailsComponent } from './product-details/product-details.component';
import { AdminComponent } from './admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatMenuModule} from '@angular/material/menu'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatSidenavModule} from '@angular/material/sidenav';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { UpdateComponent } from './update/update.component'; 



const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'adminlogin', component: AdminLoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'laptops', component: LaptopsComponent },
  { path: 'smartphones', component: SmartphonesComponent },
  { path: 'peripherals', component: PeripheralsComponent },
  { path: 'update', component: UpdateComponent },
  { path: 'products/:ideProduct', component: ProductDetailsComponent },
  
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, MatToolbarModule,MatMenuModule,MatIconModule,MatSidenavModule,
  ],

  declarations: [
    AppComponent,
    LaptopsComponent,
    PeripheralsComponent,
    SmartphonesComponent,
    TopNavComponent,
    CheckoutComponent,
    HomepageComponent,
    
    ProductDetailsComponent,
    AdminComponent,
    AdminLoginComponent,
    UpdateComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
