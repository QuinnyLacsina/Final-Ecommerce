import { Component } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  password = new FormControl('');
  username = new FormControl('');

  constructor(private router: Router) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (!this.username.value) {
      window.alert('Please fill your username and password!');
    } else if (
      this.username.value == 'admin.shoppers' &&
      this.password.value == 'Sh0pp3rs_@dm1n123'
    ) {
      this.router.navigateByUrl('/welcome');
    } else {
      window.alert('Invalid email and password!');
    }
  }
}
