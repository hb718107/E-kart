import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductLister } from '../../Models/Product';
import { ProductList } from '../product-list/product-list';
import { CommonModule } from '@angular/common';
import { faCartShopping, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'product-details',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  @Input() productListComp: ProductList;

  product: ProductLister;

  icons = {
    buy: faCartShopping,
    close: faTimes
  };

  ngOnInit() {
    this.product = this.productListComp.selectedProduct;
    // Disable background scrolling when modal is open
    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy() {
    // Re-enable background scrolling when modal is closed
    document.body.style.overflow = 'auto';
  }

  closeProductDetail() {
    this.productListComp.selectedProduct = undefined;
  }
}
