import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/models/order.model';
import { Product } from 'src/app/models/product.model';
import { deleteOrder } from 'src/app/redux/actions';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderProducts: Order[] = [];

  token: string = "";

  constructor(private store: Store, private productService: ProductService) { }

  ngOnInit(): void {
    this.token = this.productService.getToken();
    this.store.pipe(map((state: any) => { return state.goods.user.orders; }))
      .subscribe(orderProducts => {
        if (orderProducts) {
          this.orderProducts = orderProducts;
        }
      });
  }

  deleteOrder(order: Order) {
    if (!this.token) {
      alert("Удалять заказы может только авторизованный пользователь. Пожалуйста, авторизуйтесь!");
      return;
    }
    this.productService.deleteData(`http://localhost:3004/users/order?id=${order.id}`, this.token).subscribe((data: any) => {
    this.store.dispatch(deleteOrder({ order }));
    });
  }

}
