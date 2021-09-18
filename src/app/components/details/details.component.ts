import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Category, SubCategory } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { addProductToCart, addProductToFavorite } from 'src/app/redux/actions';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  token: string = "";

  id: string = "";

  categoryName: string = '';

  subCategoryName: string = '';

  currentProduct: Product = { "id": '', "name": '', "imageUrls": [], "availableAmount": 0, "price": 0, "rating": 0, "description": '' };

  constructor(private router: Router, private route: ActivatedRoute, private store: Store, private productService: ProductService) {
    route.params.subscribe(params => this.id = params['itemId']);
  }

  ngOnInit(): void {
    this.token = this.productService.getToken();
    this.store.pipe(map((state: any) => { return state.goods.products; }))
      .subscribe(goods => {
        if (goods.length) {
          let detailsItem = goods.find((el: Product) => this.id === el.id);
          if (!detailsItem) {
            this.router.navigate(['/**']);
            return;
          } else {
            this.currentProduct = detailsItem;
          }
        }
      });
    this.store.pipe(map((state: any) => { return state.goods.categories; }))
      .subscribe(goods => {
        if (this.currentProduct.category) {
          let categ = goods.find((el: Category) => el.id === this.currentProduct.category);
          this.categoryName = categ.name;
          this.subCategoryName = categ.subCategories.find((el: SubCategory) => el.id === this.currentProduct.subCategory).name;
        }
      });
  }

  ngDoCheck() {
    this.token = this.productService.getToken();
    this.store.pipe(map((state: any) => { return state.goods.products; }))
      .subscribe(goods => {
        if (goods.length) {
          let detailsItem = goods.find((el: Product) => this.id === el.id);
          if (!detailsItem) {
            this.router.navigate(['/**']);
            return;
          } else {
            this.currentProduct = detailsItem;
          }
        }
      });
    this.store.pipe(map((state: any) => { return state.goods.categories; }))
      .subscribe(goods => {
        if (this.currentProduct.category) {
          let categ = goods.find((el: Category) => el.id === this.currentProduct.category);
          this.categoryName = categ.name;
          this.subCategoryName = categ.subCategories.find((el: SubCategory) => el.id === this.currentProduct.subCategory).name;
        }
      });
  }


  addToFavorite() {
    if (!this.token) {
      alert("Добавлять товары в избранные может только авторизованный пользователь. Пожалуйста, авторизуйтесь!");
      return;
    }
    if (!this.currentProduct.isFavorite) {
      this.productService.postData("http://localhost:3004/users/favorites", { id: this.currentProduct.id }, this.token).subscribe((data: any) => {
        this.store.dispatch(addProductToFavorite({ product: this.currentProduct }));
      });
    }
  }

  addToCart() {
    if (!this.token) {
      alert("Добавлять товары в корзину может только авторизованный пользователь. Пожалуйста, авторизуйтесь!");
      return;
    }
    if (!this.currentProduct.isInCart) {
      this.productService.postData("http://localhost:3004/users/cart", { id: this.currentProduct.id }, this.token).subscribe((data: any) => {
        this.store.dispatch(addProductToCart({ product: this.currentProduct }));
      });
    }
  }

}
