import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.model';

@Pipe({
  name: 'sortPopularity'
})
export class SortPopularityPipe implements PipeTransform {

  transform(items: Product[], sortOrderPopularity: boolean | undefined): any {
    if (sortOrderPopularity === undefined) { return items; }
    if (sortOrderPopularity === true) {
      return [...items].sort(function (a: Product, b: Product) { return a.rating - b.rating; });
    }
    if (sortOrderPopularity === false) {
      return [...items].sort(function (a: Product, b: Product) { return b.rating - a.rating; });
    }
  }

}
