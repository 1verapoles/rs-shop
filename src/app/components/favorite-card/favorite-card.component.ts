import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';
import { addProductToCart, addProductToFavorite, deleteProductFromFavorite } from 'src/app/redux/actions';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.css']
})
export class FavoriteCardComponent implements OnInit {

  @Input() product: Product = { "id": '', "name": '', "imageUrls": [], "availableAmount": 0, "price": 0, "rating": 0, "description": '' };

  productRating: number[] = [];

  token: string = "";

  constructor(private store: Store, private productService: ProductService) {
  }

  ngOnInit() {
    this.token = this.productService.getToken();
    if (this.product.rating) this.productRating = new Array(this.product.rating).fill(1);
  }

  deleteFromFavorite() {
    if (!this.token) {
      alert("Удалять товары из избранного может только авторизованный пользователь. Пожалуйста, авторизуйтесь!");
      return;
    }
    if (this.product.isFavorite) {
      this.productService.deleteData(`http://localhost:3004/users/favorites?id=${this.product.id}`, this.token).subscribe((data: any) => {
        this.store.dispatch(deleteProductFromFavorite({ product: this.product }));
      });
    }
  }

  addToCart() {
    if (!this.token) {
      alert("Добавлять товары в корзину может только авторизованный пользователь. Пожалуйста, авторизуйтесь!");
      return;
    }
    if (!this.product.isInCart) {
      this.productService.postData("http://localhost:3004/users/cart", { id: this.product.id }, this.token).subscribe((data: any) => {
        this.store.dispatch(addProductToCart({ product: this.product }));
      });
    }
  }
}
