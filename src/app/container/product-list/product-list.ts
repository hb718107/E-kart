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

  @Input()
  selectedCategory: string = '';

  @Input()
  viewMode: string = 'ALL';

  private lastParams = { searchText: '', selectedCategory: '', viewMode: '' };

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchText'] || changes['selectedCategory'] || changes['viewMode']) {
      this.loadProducts();
    }
  }

  loadProducts() {
    // REDUNDANCY SHIELD: Skip load if parameters haven't materially changed
    if (this.lastParams.searchText === this.searchText && 
        this.lastParams.selectedCategory === this.selectedCategory && 
        this.lastParams.viewMode === this.viewMode) {
      return; 
    }

    // Update state cache
    this.lastParams = { 
      searchText: this.searchText, 
      selectedCategory: this.selectedCategory, 
      viewMode: this.viewMode 
    };

    let obs;
    
    if (this.viewMode === 'OFFERS') {
      obs = this.productService.getOffers();
    } else if (this.selectedCategory) {
      // Use the department aggregator
      obs = this.productService.getProductsByDepartment(this.selectedCategory);
    } else if (this.searchText.trim()) {
      obs = this.productService.searchProducts(this.searchText);
    } else {
      obs = this.productService.getProducts();
    }

    obs.subscribe({
      next: (data) => {
        // CENTRALIZED FILTERING LOGIC (GHOST GRID FIX)
        this.products = data.filter(prod => {
          const matchesFilter = this.selectedFilterRadioButton === 'all' || 
                              prod.is_in_inventory.toString() === this.selectedFilterRadioButton;
          
          const matchesSearch = !this.searchText.trim() || 
                               prod.name.toLowerCase().includes(this.searchText.toLowerCase());

          return matchesFilter && matchesSearch;
        });

        this.totalProducts = data.length;
        this.inStockProducts = data.filter(p => p.is_in_inventory).length;
        this.outOfStockProducts = data.filter(p => !p.is_in_inventory).length;
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
