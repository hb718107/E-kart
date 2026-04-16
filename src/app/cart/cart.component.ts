import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CartService, CartItem } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';
import { OrderService } from '../services/order.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faMinus, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  isLoggedIn = false;
  loading = false;
  
  // Smart-Fill Fields
  shippingAddress = '';
  phoneNumber = '';
  billingInfo = '';

  icons = {
    delete: faTrash,
    minus: faMinus,
    plus: faPlus,
    back: faArrowLeft
  };

  constructor(
    public cartService: CartService, 
    private router: Router,
    private auth: AuthService,
    private profile: ProfileService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });

    this.auth.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      if (!user) {
        // Redirection handled in checkout button check or guard if added
      }
    });

    // --- SMART-FILL LOGIC ---
    this.profile.profile$.subscribe(p => {
      if (p) {
        this.shippingAddress = p.address || '';
        this.phoneNumber = p.phone || '';
        this.billingInfo = p.billing_info || '';
      }
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

  async checkout() {
    const profile = this.profile.getProfile();
    const isComplete = profile && profile.phone && profile.address;

    if (!this.isLoggedIn || !isComplete) {
      this.router.navigate(['/auth']);
      return;
    }

    if (!this.shippingAddress || !this.phoneNumber) {
      alert('Please provide deployment coordinates (Address & Phone).');
      return;
    }

    this.loading = true;
    try {
      await this.orderService.placeOrder(this.cartItems, this.cartService.getCartTotal(), {
        address: this.shippingAddress,
        phone: this.phoneNumber
      });
      
      alert('Deployment Confirmed. Order archived in the vault.');
      this.cartService.clearCart();
      this.router.navigate(['/']);
    } catch (err: any) {
      alert('Deployment Failed: ' + err.message);
    } finally {
      this.loading = false;
    }
  }
}
