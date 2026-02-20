import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CartService, CartItem } from '../services/cart.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faMinus, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  
  icons = {
    delete: faTrash,
    minus: faMinus,
    plus: faPlus,
    back: faArrowLeft
  };

  constructor(public cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  incrementQuantity(item: CartItem): void {
    this.cartService.updateQuantity(item.product, item.size, item.color, item.quantity + 1);
  }

  decrementQuantity(item: CartItem): void {
    this.cartService.updateQuantity(item.product, item.size, item.color, item.quantity - 1);
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.product, item.size, item.color);
  }

  checkout(): void {
    alert('Thank you for your order! Your simulated checkout is complete.');
    this.cartService.clearCart();
    this.router.navigate(['/']);
  }
}
