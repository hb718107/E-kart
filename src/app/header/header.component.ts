import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { SearchService } from '../services/search.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartCount: number = 0;

  constructor(
    private cartService: CartService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartCount = this.cartService.getCartCount();
    });
  }

  onSearchChange(event: any) {
    this.searchService.setSearchText(event.target.value);
  }
}
