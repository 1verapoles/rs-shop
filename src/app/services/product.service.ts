import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { addAllProducts } from '../redux/actions';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private store: Store) { }

  getProducts(url: string) {
    this.http.get(url).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      }
      )
    ).subscribe((data: any) => {
      let products: Product[] = [];
      for (let categ in data) {
        for (let subcat in data[categ]) {
          for (let i = 0; i < data[categ][subcat].length; i++) {
            products.push({ ...data[categ][subcat][i], "isInCart": false, "isFavorite": false, "category": categ, "subCategory": subcat });
          }
        }
      }
      this.store.dispatch(addAllProducts({ products }));
    });
  }

  getData(url: string) {
    return this.http.get(url).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      }
      )
    );
  }

  getToken() {
    const data = localStorage.getItem("user");
    let user;
    if (data) {
      user = JSON.parse(data);
      return user.token;
    } else {
      return undefined;
    }
  }

  postData(url: string, body: any, bearer: string) {
    const myHeaders = new HttpHeaders().set('Authorization', `Bearer ${bearer}`);
    return this.http.post(url, body, { headers: myHeaders }).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      }
      )
    );
  }

  postData1(url: string, body: any, bearer: string) {
    const myHeaders = new HttpHeaders().set('Authorization', `Bearer ${bearer}`).set('responseType', 'text');
    return this.http.post(url, body, { headers: myHeaders }).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      }
      )
    );
  }

  deleteData(url: string, bearer: string) {
    const myHeaders = new HttpHeaders().set('Authorization', `Bearer ${bearer}`);
    return this.http.delete(url, { headers: myHeaders }).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      }
      )
    );
  }

  getDataLogin(url: string, bearer: string) {
    const myHeaders = new HttpHeaders().set('Authorization', `Bearer ${bearer}`);
    return this.http.get(url, { headers: myHeaders }).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      }
      )
    );
  }

  register(url: string, body: any) {
    return this.http.post(url, body).pipe(
      //@ts-ignore
      catchError((err: any) => {
        if (err.statusText === "Unauthorized") { alert("Неверный логин или пароль!"); }
        console.error(err);
        throw err;
      }
      )
    );
  }

}
