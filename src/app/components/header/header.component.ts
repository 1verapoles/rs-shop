import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { fromEvent } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, take } from 'rxjs/operators';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { addCategories, addUser } from 'src/app/redux/actions';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  city: string = '';

  categories: Category[] = [];

  searchItems: Product[] = [];

  img: string[] = ['../../../assets/household.png', '../../../assets/elect.png', '../../../assets/comp.png', '../../../assets/furniture.png', '../../../assets/hobby.png'];

  constructor(private productService: ProductService, private http: HttpClient, private store: Store, private router: Router) { }

  ngOnInit(): void {
    // this.productService.getData("http://ip-api.com/json").subscribe((data: any) => {
    //   if (data.status === 'success') { this.city = data.city; console.log(this.city); }
    // });
    // var header = {
    //   headers: new HttpHeaders()
    //     .set('Authorization', `Bearer 58ebfdf7f1f558c5c86e17f6`)
    // }
    // this.productService.getData("http://localhost:3004/users/userInfo", header).subscribe((data: any) => {
    //   console.log(data);
    // });
    // this.http.post<any>('http://localhost:3004/users/register', { "firstName": "string", "lastName": "string", "login": "string", "password": "string" }).subscribe(data => {
    //   console.log(data);
    // })
    // localStorage.setItem('user', JSON.stringify({
    //   "firstName": "Carlson",
    //   "lastName": "Marsh",
    //   "token": "58ebfdf7279c92a711dc8918",
    //   "login": "Sparks",
    //   "password": "consectetur",
    //   "cart": [],
    //   "favorites": [],
    //   "orders": []
    // }));
    this.productService.getData("http://localhost:3004/categories").subscribe((categories: any) => {
      if (categories.length) {
        this.categories = categories.map((el: Category, i: number) => ({ ...el, img: this.img[i] }));
        this.store.dispatch(addCategories({ categories: this.categories }));
      }
    });
  }

  logout() {
    this.store.dispatch(addUser({
      user: {
        "firstName": '',
        "lastName": '',
        "token": '',
        "login": '',
        "password": '',
        "cart": [],
        "favorites": [],
        "orders": []
      }
    }));
    localStorage.removeItem('user');
    alert("Вы вышли из аккаунта!");
  }

  onKeyUp(e: any): void {
    if (e.target.value === "") { this.searchItems = []; }
    fromEvent(e.target, 'keyup')
      .pipe(
        map((input: any) => input.target.value),
        map((value: string) => value.trim()),
        filter((query: string) => query.length >= 3),
        debounceTime(2000),
        distinctUntilChanged(),
        switchMap(input => { return this.productService.getData(`http://localhost:3004/goods/search?text=${input}`) }))
      .subscribe((data: any) => {
        if (data.length) {
          this.searchItems = data;
        }
      });
  }

}
