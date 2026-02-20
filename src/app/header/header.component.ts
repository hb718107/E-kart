import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { TopMenu } from './top-menu/top-menu';
import { TopHeader } from "../top-header/top-header";
import { MainMenu } from './main-menu/main-menu';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, TopMenu, TopHeader, MainMenu, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Ekart';
  tagline = 'Your one-stop online store';
  message = 'Welcome Boss!';
  icons = {
    search: faSearch,
    user: faUser,
    cart: faShoppingCart
  };

  cartCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartCount = this.cartService.getCartCount();
    });
  }
}
