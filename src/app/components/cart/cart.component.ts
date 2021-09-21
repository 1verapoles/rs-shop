import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { deleteProductFromCart, changeQty, addOrder } from 'src/app/redux/actions';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts: Product[] = [];

  token: string = "";

  myForm: FormGroup;

  cartTotal: number = 0;

  constructor(private store: Store, private productService: ProductService) {
    this.myForm = new FormGroup({
      "userName": new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      "address": new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
      "tel": new FormControl("", [Validators.required, Validators.pattern("\\+[0-9]+")]),
      "date": new FormControl("", [Validators.required,
      Validators.pattern("(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))")
      ]),
      "time": new FormControl("", [Validators.required, Validators.pattern("(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9])")]),
      "comment": new FormControl("", Validators.maxLength(250))
    });
  }

  ngOnInit(): void {
    this.token = this.productService.getToken();
    this.store.pipe(map((state: any) => { return state.goods.user.cart; }))
      .subscribe(cartProducts => {
        if (cartProducts) {
          this.cartProducts = cartProducts;
          // @ts-ignore
          this.cartTotal = cartProducts.reduce((acc: number, el: Product) => acc + el.total, 0);
        }
      });
  }

  deleteFromCart(product: Product) {
    if (!this.token) {
      alert("Удалять товары из корзины может только авторизованный пользователь. Пожалуйста, авторизуйтесь!");
      return;
    }
    if (product.isInCart) {
      this.productService.deleteData(`http://localhost:3004/users/cart?id=${product.id}`, this.token).subscribe((data: any) => {
        this.store.dispatch(deleteProductFromCart({ product }));
      });
    }
  }


  minus(product: Product) {
    if (product.orderQty === 1) { return; }
    let newProduct = { ...product };
    // @ts-ignore
    newProduct.orderQty = newProduct.orderQty - 1;
    newProduct.total = +(newProduct.orderQty * newProduct.price).toFixed(2);
    this.store.dispatch(changeQty({ product: newProduct }));
  }

  plus(product: Product) {
    if (product.orderQty === product.availableAmount) { return; }
    let newProduct = { ...product };
    // @ts-ignore
    newProduct.orderQty = newProduct.orderQty + 1;
    newProduct.total = +(newProduct.orderQty * newProduct.price).toFixed(2);
    this.store.dispatch(changeQty({ product: newProduct }))
  }

  submit() {
     if (!this.token) {
      alert("Добавлять товары в заказы может только авторизованный пользователь. Пожалуйста, авторизуйтесь!");
      return;
    }
    let un = this.myForm.value.userName;
    let addr = this.myForm.value.address;
    let te = this.myForm.value.tel;
    let da = this.myForm.value.date;
    let ti = this.myForm.value.time;
    let com = this.myForm.value.comment;
    this.productService.postData1("http://localhost:3004/users/order", {
      "items": this.cartProducts.map(product => ({ id: product.id, amount: product.orderQty })),
      "details": {
        "name": un,
        "address": addr,
        "phone": te,
        "timeToDeliver": `${da} ${ti}`,
        "comment": com
      }
    }, this.token).subscribe((data: any) => {
      this.productService.getDataLogin("http://localhost:3004/users/userInfo", this.token).subscribe((data: any) => {
        this.store.dispatch(addOrder({
        order: {
          "items": this.cartProducts,
          "details": {
            "name": un,
            "address": addr,
            "phone": te,
            "timeToDeliver": `${da} ${ti}`,
            "comment": com
          },
          "id": data.orders[data.orders.length - 1].id,
          "cartTotal": this.cartTotal
        }
      }));
      });
    });   
    alert(`ФИО - ${un}\n Адрес доставки - ${addr}\n Номер телефона - ${te}\n Желаемая дата доставки - ${da}\n Желаемое время доставки - ${ti}\n Комментарий к заказу - ${com}\nВаш заказ создан успешно, ожидайте доставку в указанное время`);
     this.myForm.reset();
  }

}