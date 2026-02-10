import { Component, Input, OnInit } from '@angular/core';
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
export class ProductList implements OnInit {
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

  loadProducts() {

    this.products = this.productService.getProducts();

    this.totalProducts = this.productService.getTotalProductsCount();

    this.inStockProducts = this.productService.getInStockCount();
    this.outOfStockProducts = this.productService.getOutOfStockCount();
  }

  onFilterChange(value: string) {
    this.selectedFilterRadioButton = value;
  }
}
