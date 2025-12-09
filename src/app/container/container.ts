import { Component } from '@angular/core';
import { Search } from './search/search';
import { CommonModule } from '@angular/common';
import { ProductList } from "./product-list/product-list";

@Component({
  selector: 'container',
  imports: [Search, CommonModule, ProductList],
  templateUrl: './container.html',
  styleUrl: './container.css',
})
export class Container {

    somenames : string[] = ['tony stark','bruce banner','thor','steve rogers','natasha romanoff','Fury','Odin'];
//   // user ='john wick'
//   addToCart : number = 0;
//   product = {
//   name : 'iPhone 17 pro max',
//   price : 999,
//   color : 'Matte Brown',
//   discount : 6.5,
//   inStock : 5,
//   pimage: '/assets/123.png',
// }
// getDiscountedPrice(){
//   return(this.product.price - (this.product.price * this.product.discount / 100))
// }
// onclickchange(event : any){
//   // this.user = event.target.value;
//   // // console.log(event.target.value);

// }
// decrementCartValue(){
//   if (this.addToCart > 0){
//   this.addToCart--;
//   }
// }
// incrementCartValue(){
//   if(this.addToCart != this.product.inStock){
//   this.addToCart++;
//   }
// }
searchText : string = '';
setSearchText(value : string){
  this.searchText = value;
}
}
