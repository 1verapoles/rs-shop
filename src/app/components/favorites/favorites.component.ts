import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favoriteProducts: Product[] = [];

  token: string = "";

  constructor(private store: Store, private productService: ProductService) { }

  ngOnInit(): void {
    this.token = this.productService.getToken();
    this.store.pipe(map((state: any) => { return state.goods.user.favorites; }))
      .subscribe(favoriteProducts => {
        if (favoriteProducts) {
          this.favoriteProducts = favoriteProducts;
        }
      });
  }

}
