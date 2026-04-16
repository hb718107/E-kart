import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product';
import { ProductLister } from '../../Models/Product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent implements OnInit {
  product: ProductLister | undefined;
  loading: boolean = true;
  selectedSize: string | number | undefined;
  selectedColor: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(+id).subscribe({
        next: (p) => {
          this.product = p;
          this.loading = false;
          window.scrollTo(0, 0); // Reset scroll position
        },
        error: (err) => {
          console.error('Failed to load product', err);
          this.loading = false;
        }
      });
    }
  }

  addToCart(): void {
    if (!this.product) return;

    const hasSizes = this.product.size && this.product.size.length > 0;
    const hasColors = this.product.color && this.product.color.length > 0;

    if (hasSizes && !this.selectedSize) {
      alert('Please select a size.');
      return;
    }

    if (hasColors && !this.selectedColor) {
      alert('Please select a color.');
      return;
    }

    this.cartService.addToCart(this.product, this.selectedSize || 'N/A', this.selectedColor || 'N/A', 1);
    alert('Experience added to collection.');
  }
}
