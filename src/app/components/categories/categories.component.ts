import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoryId: string = '';
  categoryName: string = '';

  startPosition: number = 0;

  listGoods: Product[] = [];

  isDisabled: boolean = false;

  loadedByTenGoods: Product[] = [];

  sortOrderPrice: undefined | boolean = undefined;

  sortOrderPopularity: undefined | boolean = undefined;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store, private productService: ProductService) {
    route.params.subscribe(params => { this.categoryId = params['categoryId']; });
  }

  ngOnInit(): void {
    this.store.pipe(map((state: any) => { return state.goods.products; }))
      .subscribe(goods => {
        if (goods.length) {
          this.listGoods = goods.filter((el: Product) => this.categoryId === el.category);
          if (!this.listGoods) {
            this.router.navigate(['/**']);
            return;
          }
          this.loadedByTenGoods = this.listGoods.slice(0, 10);
        }
      });

    this.store.pipe(map((state: any) => { return state.goods.categories; }))
      .subscribe(goods => {
        if (goods.length) {
          this.categoryName = goods.find((el: Category) => el.id === this.categoryId).name;
        }
      });
  }


  // ngDoCheck() {
  //   this.store.pipe(map((state: any) => { return state.goods.products; }))
  //     .subscribe(goods => {
  //       if (goods.length) {
  //         this.listGoods = goods.filter((el: Product) => this.categoryId === el.category);
  //         if (!this.listGoods) {
  //           this.router.navigate(['/**']);
  //           return;
  //         }
  //         this.loadedByTenGoods = this.listGoods.slice(0, 10);
  //       }
  //     });

  //   this.store.pipe(map((state: any) => { return state.goods.categories; }))
  //     .subscribe(goods => {
  //       if (goods.length) {
  //         this.categoryName = goods.find((el: Category) => el.id === this.categoryId).name;
  //       }
  //     });
  // }

  showMoreGoods() {
    if (this.startPosition > this.listGoods.length - 10) { this.isDisabled = true; return; }
    this.startPosition = this.startPosition + 10;
    this.loadedByTenGoods = this.listGoods.slice(0, this.startPosition + 10);
  }

  changeSortOrderPrice() {
    if (this.sortOrderPrice === undefined) { this.sortOrderPrice = true; }
    this.sortOrderPrice = !this.sortOrderPrice;
  }

  changeSortOrderPopularity() {
    if (this.sortOrderPopularity === undefined) { this.sortOrderPopularity = true; }
    this.sortOrderPopularity = !this.sortOrderPopularity;
  }

}
