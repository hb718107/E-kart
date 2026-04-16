import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductLister } from '../../Models/Product';
import { ProductList } from '../product-list/product-list';
import { CommonModule } from '@angular/common';
import { faCartShopping, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

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

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

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

  navigateToFullView() {
    const productId = this.product.id;
    this.closeProductDetail(); // Ensure sidebar closes
    this.router.navigate(['/product', productId]);
  }

  addToCart() {
    const hasSizes = this.product.size && this.product.size.length > 0;
    const hasColors = this.product.color && this.product.color.length > 0;

    if (hasSizes && !this.selectedSize) {
      alert('Please select a size before adding to cart.');
      return;
    }

    if (hasColors && !this.selectedColor) {
      alert('Please select a color before adding to cart.');
      return;
    }
    
    this.cartService.addToCart(this.product, this.selectedSize || 'N/A', this.selectedColor || 'N/A', 1);
    this.closeProductDetail();
  }
}
