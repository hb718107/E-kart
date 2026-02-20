import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductLister } from '../../Models/Product';
import { ProductList } from '../product-list/product-list';
import { CommonModule } from '@angular/common';
import { faCartShopping, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'product-details',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  @Input() productListComp: ProductList;

  product: ProductLister;
  selectedSize: number | string;
  selectedColor: string;

  icons = {
    buy: faCartShopping,
    close: faTimes
  };

  constructor(private cartService: CartService) {}

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

  addToCart() {
    if (!this.selectedSize || !this.selectedColor) {
      alert('Please select both a size and a color before adding to cart.');
      return;
    }
    
    this.cartService.addToCart(this.product, this.selectedSize, this.selectedColor, 1);
    this.closeProductDetail(); // Optional: close detail view after adding
  }
}
