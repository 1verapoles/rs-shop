import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Category, SubCategory } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {

  categoryId: string = '';

  subCategoryId: string = '';

  categoryName: string = '';

  subCategoryName: string = '';

  startPosition: number = 0;

  listGoods: Product[] = [];

  isDisabled: boolean = false;

  loadedByTenGoods: Product[] = [];

  sortOrderPrice: undefined | boolean = undefined;

  sortOrderPopularity: undefined | boolean = undefined;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store) {
    route.params.subscribe(params => {
      this.categoryId = params['categoryId'];
      this.subCategoryId = params['subCategoryId'];
    });
  }

  ngOnInit(): void {
    this.store.pipe(map((state: any) => { return state.goods.products; }))
      .subscribe(goods => {
        if (goods.length) {
          this.listGoods = goods.filter((el: Product) => this.subCategoryId === el.subCategory);
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
          let categ = goods.find((el: Category) => el.id === this.categoryId);
          this.categoryName = categ.name;
          this.subCategoryName = categ.subCategories.find((el: SubCategory) => el.id === this.subCategoryId).name;
        }
      });
  }

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
