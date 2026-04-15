import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductList } from "./product-list/product-list";
import { ProductDetails } from './product-details/product-details';
import { SearchService } from '../services/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'container',
  imports: [CommonModule, ProductList, ProductDetails],
  templateUrl: './container.html',
  styleUrl: './container.css',
})
export class Container implements OnInit, OnDestroy {
  somenames: string[] = ['tony stark', 'bruce banner', 'thor', 'steve rogers', 'natasha romanoff', 'Fury', 'Odin'];
  searchText: string = '';
  private searchSubscription: Subscription;

  @ViewChild(ProductList) productListComponent: ProductList

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.searchSubscription = this.searchService.searchText$.subscribe(text => {
      this.searchText = text;
    });
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
