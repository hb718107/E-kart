import { Component } from '@angular/core';

@Component({
  selector: 'product-list',
  imports: [],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  product = {
  name : 'iPhone',
  price : 999,
  color : 'Matte Brown',
  discount : 6.5,
  inStock : 5
}
getDiscountedPrice(){
  return(this.product.price - (this.product.price * this.product.discount / 100))
}
}
