import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { addUser } from 'src/app/redux/actions';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  myForm: FormGroup;

  token: string = '';

  constructor(private store: Store, private productService: ProductService) {
    this.myForm = new FormGroup({
      "login": new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      "password": new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(50)])
    });
  }

  submit() {
    this.productService.register("http://localhost:3004/users/login", {
      "login": this.myForm.value.login,
      "password": this.myForm.value.password,
    }).subscribe((token: any) => {
      this.token = token.token;
      this.productService.getDataLogin("http://localhost:3004/users/userInfo", this.token).subscribe((user: any) => {
        this.store.dispatch(addUser({
          user: {
            ...user,
            "token": this.token,
            "login": this.myForm.value.login,
            "password": this.myForm.value.password,
            "favorites": user.favorites,
            "cart": user.cart,
          }
        }));
        localStorage.setItem('user', JSON.stringify({
          ...user,
          "token": this.token,
          "login": this.myForm.value.login,
          "password": this.myForm.value.password
        }));
        alert("Вы вошли в аккаунт!");
        this.myForm.reset();
      });
    });

  }

}
