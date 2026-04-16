import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-user-manager',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">User Management</h2>
          <p class="text-sm text-slate-500 font-medium">Manage all registered accounts within the platform.</p>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50 dark:bg-slate-900/50">
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">User ID / Identifier</th>
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Shipping Address</th>
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">User Role</th>
                <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
              <tr *ngFor="let user of users" class="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-500">
                      {{user.id.substring(0, 2) | uppercase}}
                    </div>
                    <div>
                      <p class="text-sm font-bold text-slate-900 dark:text-white">{{user.id}}</p>
                      <p class="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{{user.phone || 'NO CONTACT'}}</p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <p class="text-xs text-slate-600 dark:text-slate-400 font-medium max-w-[200px] truncate" [title]="user.address || 'N/A'">
                    {{user.address || 'No shipping address provided.'}}
                  </p>
                </td>
                <td class="px-6 py-4">
                  <span [class]="user.role === 'ADMIN' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 border-transparent'" 
                        class="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border">
                    {{user.role || 'USER'}}
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <button class="p-2 text-slate-400 hover:text-primary transition-colors">
                    <span class="material-symbols-outlined">settings</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div *ngIf="users.length === 0" class="p-20 text-center">
          <span class="material-symbols-outlined text-slate-300 text-4xl mb-4">search_off</span>
          <p class="text-slate-500 font-bold text-sm">No Pilot signatures detected in the manifest.</p>
        </div>
      </div>
    </div>
  `
})
export class UserManagerComponent implements OnInit {
  users: any[] = [];

  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    await this.fetchUsers();
  }

  async fetchUsers() {
    const { data, error } = await this.supabase.client
      .from('profiles')
      .select('*')
      .order('role', { ascending: false });

    if (error) {
      console.error('STARK SECURITY: Failed to retrieve Pilot Manifest.', error);
      return;
    }

    this.users = data || [];
  }
}
