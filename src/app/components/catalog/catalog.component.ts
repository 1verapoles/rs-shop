import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Category, SubCategory } from 'src/app/models/category.model';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  categories: Category[] = [];

  category: Category | undefined = { id: "", name: "", subCategories: [{ id: "", name: "" }] };

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.pipe(map((state: any) => { return state.goods.categories; }))
      .subscribe(goods => {
        if (goods.length) {
          this.categories = goods;
        }
      });
  }

  showSubcategories(categoryId: string) {
    this.category = this.categories.find((el) => el.id === categoryId);
  }

}
