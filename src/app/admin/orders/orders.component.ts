import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-order-manager',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">Order Management</h2>
          <p class="text-sm text-slate-500 font-medium">Tracking and managing all active substrate orders.</p>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50 dark:bg-slate-900/50">
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Order ID / Date</th>
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Customer</th>
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Total Amount</th>
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Status Controls</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
              <tr *ngFor="let order of orders" class="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                <td class="px-6 py-4">
                  <p class="text-sm font-bold text-slate-900 dark:text-white">#{{order.id.toString().padStart(6, '0')}}</p>
                  <p class="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{{order.created_at | date:'MMM dd, HH:mm'}}</p>
                </td>
                <td class="px-6 py-4">
                  <p class="text-xs text-slate-900 dark:text-white font-bold">{{order.user_id.substring(0, 15)}}...</p>
                  <p class="text-[10px] text-slate-500 font-medium uppercase truncate max-w-[150px]">{{order.shipping_address}}</p>
                </td>
                <td class="px-6 py-4">
                  <p class="text-sm font-black text-slate-900 dark:text-white">\${{order.total_amount | number:'1.2-2'}}</p>
                  <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{{order.items.length}} ITEMS</p>
                </td>
                <td class="px-6 py-4">
                  <span [class]="getStatusClass(order.status)" class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border">
                    {{order.status}}
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <button (click)="updateStatus(order.id, 'PENDING')" class="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-700 transition-all" title="Pending">
                      <span class="material-symbols-outlined text-[16px]">sync</span>
                    </button>
                    <button (click)="updateStatus(order.id, 'SHIPPED')" class="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-700 transition-all text-primary" title="Ship">
                      <span class="material-symbols-outlined text-[16px]">local_shipping</span>
                    </button>
                    <button (click)="updateStatus(order.id, 'DELIVERED')" class="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-700 transition-all text-success" title="Deliver">
                      <span class="material-symbols-outlined text-[16px]">check_circle</span>
                    </button>
                    <button (click)="updateStatus(order.id, 'CANCELLED')" class="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-700 transition-all text-error" title="Cancel">
                      <span class="material-symbols-outlined text-[16px]">cancel</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div *ngIf="orders.length === 0" class="p-20 text-center">
          <span class="material-symbols-outlined text-slate-300 text-4xl mb-4">inventory</span>
          <p class="text-slate-500 font-bold text-sm">No mission logs captured in the grid.</p>
        </div>
      </div>
    </div>
  `
})
export class OrderManagerComponent implements OnInit {
  orders: any[] = [];

  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    await this.fetchOrders();
  }

  async fetchOrders() {
    const { data, error } = await this.supabase.client
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('STARK SECURITY: Failed to retrieve Mission Logs.', error);
      return;
    }

    this.orders = data || [];
  }

  async updateStatus(orderId: string, status: string) {
    const { error } = await this.supabase.client
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) {
      console.error('STARK SECURITY: Failed to update Mission Status.', error);
      return;
    }

    await this.fetchOrders(); // Refresh grid
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'PENDING': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'SHIPPED': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'DELIVERED': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'CANCELLED': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      default: return 'bg-slate-100 text-slate-500 border-slate-200';
    }
  }
}
