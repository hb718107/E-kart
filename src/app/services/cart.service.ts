import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductLister } from '../Models/Product';

export interface CartItem {
  product: ProductLister;
  size: number | string;
  color: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();

  constructor() {
    // Optionally, load from localStorage here if we wanted persistence
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.getValue();
  }

  addToCart(product: ProductLister, size: number | string, color: string, quantity: number = 1): void {
    const currentItems = this.getCartItems();
    
    // Check if the item with the exact same size and color already exists
    const existingItemIndex = currentItems.findIndex(
      item => item.product.id === product.id && item.size === size && item.color === color
    );

    if (existingItemIndex > -1) {
      // If it exists, update the quantity
      currentItems[existingItemIndex].quantity += quantity;
      this.cartItemsSubject.next([...currentItems]);
    } else {
      // If it doesn't exist, add it as a new item
      const newItem: CartItem = { product, size, color, quantity };
      this.cartItemsSubject.next([...currentItems, newItem]);
    }
  }

  removeFromCart(product: ProductLister, size: number | string, color: string): void {
    const currentItems = this.getCartItems();
    const updatedItems = currentItems.filter(
      item => !(item.product.id === product.id && item.size === size && item.color === color)
    );
    this.cartItemsSubject.next(updatedItems);
  }

  updateQuantity(product: ProductLister, size: number | string, color: string, newQuantity: number): void {
    if (newQuantity <= 0) {
      this.removeFromCart(product, size, color);
      return;
    }
    
    const currentItems = this.getCartItems();
    const existingItemIndex = currentItems.findIndex(
      item => item.product.id === product.id && item.size === size && item.color === color
    );
    
    if (existingItemIndex > -1) {
      currentItems[existingItemIndex].quantity = newQuantity;
      this.cartItemsSubject.next([...currentItems]);
    }
  }

  getCartCount(): number {
    return this.getCartItems().reduce((total, item) => total + item.quantity, 0);
  }

  getCartTotal(): number {
    return this.getCartItems().reduce((total, item) => {
      const price = item.product.discountPrice ? item.product.discountPrice : item.product.price;
      return total + (price * item.quantity);
    }, 0);
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }
}
