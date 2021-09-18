import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.model';

@Pipe({
  name: 'sortPrice'
})
export class SortPricePipe implements PipeTransform {

  transform(items: Product[], sortOrderPrice: boolean | undefined): any {
    if (sortOrderPrice === undefined) { return items; }
    if (sortOrderPrice === true) {
      return [...items].sort(function (a: Product, b: Product) { return a.price - b.price; });
    }
    if (sortOrderPrice === false) {
      return [...items].sort(function (a: Product, b: Product) { return b.price - a.price; });
    }
  }

}
