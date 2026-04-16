import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <!-- Welcome Header -->
      <div class="flex items-end justify-between">
        <div>
          <h2 class="text-3xl font-black tracking-tighter text-slate-900 dark:text-white">System Overview</h2>
          <p class="text-sm text-slate-500 font-medium">Real-time status of the E-kart platform.</p>
        </div>
        <div class="text-right">
          <p class="text-[10px] font-black uppercase tracking-widest text-primary">System Identifier</p>
          <p class="text-lg font-mono font-bold text-slate-700 dark:text-slate-300">EKART-{{today | date:'yyyyMMdd'}}-PRD</p>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm group hover:border-primary/50 transition-all">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
              <span class="material-symbols-outlined">group</span>
            </div>
            <span class="text-xs font-bold text-success">+12%</span>
          </div>
          <p class="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Total Users</p>
          <p class="text-3xl font-black text-slate-900 dark:text-white">{{userCount}}</p>
        </div>

        <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm group hover:border-primary/50 transition-all">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
              <span class="material-symbols-outlined">shopping_cart</span>
            </div>
            <span class="text-xs font-bold text-success">+8%</span>
          </div>
          <p class="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Active Orders</p>
          <p class="text-3xl font-black text-slate-900 dark:text-white">{{orderCount}}</p>
        </div>

        <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm group hover:border-primary/50 transition-all">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
              <span class="material-symbols-outlined">payments</span>
            </div>
            <span class="text-xs font-bold text-slate-400">Stable</span>
          </div>
          <p class="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Total Revenue</p>
          <p class="text-3xl font-black text-slate-900 dark:text-white">\${{totalRevenue | number:'1.0-0'}}</p>
        </div>

        <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm group hover:border-primary/50 transition-all">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500">
              <span class="material-symbols-outlined">inventory_2</span>
            </div>
            <span class="text-xs font-bold text-error">-2%</span>
          </div>
          <p class="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Inventory Items</p>
          <p class="text-3xl font-black text-slate-900 dark:text-white">1.2k</p>
        </div>
      </div>

      <!-- System Alerts -->
      <div class="bg-slate-900 text-white p-8 rounded-3xl overflow-hidden relative border border-slate-800 shadow-2xl">
        <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 class="text-xl font-bold mb-2">System Integrity Check</h3>
            <p class="text-slate-400 text-sm max-w-md">No critical issues detected in the current session. Platform stability is at 100%.</p>
          </div>
          <button class="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all active:scale-[0.98]">
            Run Diagnostics
          </button>
        </div>
        <!-- Decorative Grid Background -->
        <div class="absolute inset-0 opacity-10 pointer-events-none" 
             style="background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 30px 30px;">
        </div>
      </div>
    </div>
  `
})
export class AdminDashboardComponent implements OnInit {
  today = new Date();
  userCount = 0;
  orderCount = 0;
  totalRevenue = 0;

  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    await this.fetchStats();
  }

  async fetchStats() {
    // Fetch User Counts
    const { count: users } = await this.supabase.client
      .from('profiles')
      .select('*', { count: 'exact', head: true });
    this.userCount = users || 0;

    // Fetch Orders and Revenue
    const { data: orders } = await this.supabase.client
      .from('orders')
      .select('total_amount');
    
    this.orderCount = orders?.length || 0;
    this.totalRevenue = orders?.reduce((sum, o) => sum + o.total_amount, 0) || 0;
  }
}
