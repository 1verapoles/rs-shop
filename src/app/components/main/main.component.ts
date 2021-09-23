import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  popularGoods: Product[] = [];
  popularGoodsBySix: any = [];
  discountGoods: Product[] = [];
  listGoods: Product[] = [];

  constructor(private store: Store, private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.store.pipe(map((state: any) => { return state.goods.products; }))
      .subscribe(goods => {
        if (goods.length) {
          this.listGoods = goods.filter((el: Product) => el.rating === 5);
          if (!this.listGoods) {
            this.router.navigate(['/**']);
            return;
          }
          this.popularGoods = this.listGoods;
          this.discountGoods = this.listGoods.slice(24, 31);
          for (let i = 0; i < Math.floor(this.popularGoods.length / 6); i++) {
            this.popularGoodsBySix[i] = this.popularGoods.slice((i * 6), (i * 6) + 6);
          }
        }
      });
  }

}
