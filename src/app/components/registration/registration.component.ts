import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addUser } from 'src/app/redux/actions';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  myForm: FormGroup;

  constructor(private store: Store, private productService: ProductService) {
    this.myForm = new FormGroup({
      "firstName": new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      "lastName": new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      "login": new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      "password": new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(50)])
    });
  }

  submit() {
    this.productService.register("http://localhost:3004/users/register", {
      "firstName": this.myForm.value.firstName,
      "lastName": this.myForm.value.lastName,
      "login": this.myForm.value.login,
      "password": this.myForm.value.password,
    }).subscribe((user: any) => {
      this.store.dispatch(addUser({
        user: {
          "firstName": this.myForm.value.firstName,
          "lastName": this.myForm.value.lastName,
          "token": user.token,
          "login": this.myForm.value.login,
          "password": this.myForm.value.password,
          "cart": [],
          "favorites": [],
          "orders": []
        }
      }));
      localStorage.setItem('user', JSON.stringify({
        "firstName": this.myForm.value.firstName,
        "lastName": this.myForm.value.lastName,
        "token": user.token,
        "login": this.myForm.value.login,
        "password": this.myForm.value.password,
        "cart": [],
        "favorites": [],
        "orders": []
      }));
      alert("Вы зарегистрированы!");
      this.myForm.reset();
    });

  }

}
