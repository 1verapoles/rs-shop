import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rs-shop';

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts('http://localhost:3004/goods');
  }
}
