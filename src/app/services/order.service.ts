import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { AuthService } from './auth.service';
import { CartItem } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private supabase: SupabaseService,
    private auth: AuthService
  ) {}

  async placeOrder(items: CartItem[], total: number, shippingDetails: any) {
    const user = this.auth.getUser();
    if (!user) throw new Error("Authentication required for deployment.");

    const { data, error } = await this.supabase.client
      .from('orders')
      .insert({
        user_id: user.id,
        items: items.map(item => ({
          product_id: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.discountPrice || item.product.price,
          size: item.size,
          color: item.color
        })),
        total_amount: total,
        shipping_address: shippingDetails.address,
        phone_number: shippingDetails.phone,
        status: 'PENDING'
      });

    if (error) throw error;
    return data;
  }

  async getOrderHistory() {
    const user = this.auth.getUser();
    if (!user) return [];

    const { data, error } = await this.supabase.client
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}
