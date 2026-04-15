import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from './product/product';
import { Filter } from './filter/filter';
import { ProductLister } from '../../Models/Product';
import { ProductService } from '../../services/product';

@Component({
  selector: 'product-list',
  imports: [CommonModule, Product, Filter],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
})
export class ProductList implements OnInit, OnChanges {
  selectedProduct: ProductLister;
  products: ProductLister[] = [];
  totalProducts: number = 0;
  inStockProducts: number = 0;
  outOfStockProducts: number = 0;
  selectedFilterRadioButton: string = 'all';
  productnotavailablemessage: string = "No products available";

  @Input()
  searchText: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchText']) {
      this.loadProducts();
    }
  }

  loadProducts() {
    const obs = this.searchText.trim() 
      ? this.productService.searchProducts(this.searchText)
      : this.productService.getProducts();

    obs.subscribe({
      next: (data) => {
        this.products = data;
        this.totalProducts = this.products.length;
        this.inStockProducts = this.products.filter(p => p.is_in_inventory).length;
        this.outOfStockProducts = this.products.filter(p => !p.is_in_inventory).length;
      },
      error: (err) => {
        console.error('Failed to load products', err);
      }
    });
  }

  onFilterChange(value: string) {
    this.selectedFilterRadioButton = value;
  }
}
