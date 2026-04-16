import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductList } from "./product-list/product-list";
import { ProductDetails } from './product-details/product-details';
import { NavigationService, ViewMode } from '../services/navigation.service';
import { SearchService } from '../services/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'container',
  imports: [CommonModule, ProductList, ProductDetails],
  templateUrl: './container.html',
  styleUrl: './container.css',
})
export class Container implements OnInit, OnDestroy {
  searchText: string = '';
  currentCategory: string = '';
  viewMode: ViewMode = 'ALL';
  private searchSubscription: Subscription;
  private navSubscription: Subscription;

  @ViewChild(ProductList) productListComponent: ProductList

  constructor(
    private searchService: SearchService,
    private navService: NavigationService
  ) { }

  ngOnInit() {
    this.searchSubscription = this.searchService.searchText$.subscribe(text => {
      this.searchText = text;
      if (text.trim()) {
        this.currentCategory = '';
        this.viewMode = 'SEARCH';
        this.navService.setSearchMode(); // Ensure global state is synced
      } else if (this.viewMode === 'SEARCH') {
        this.navService.setAllMode();
      }
    });

    this.navSubscription = this.navService.viewMode$.subscribe(mode => {
      this.viewMode = mode;
      if (mode === 'ALL') {
        this.searchText = '';
        this.currentCategory = '';
      }
    });

    this.navService.selectedCategory$.subscribe(cat => {
      this.currentCategory = cat;
    });
  }

  setDepartment(dept: string) {
    this.searchText = ''; // Clear search when picking department
    this.currentCategory = dept;
  }

  viewAll() {
    this.navService.setAllMode();
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  setSearchText(value: string) {
    this.searchText = value;
  }
}
