import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  template: `
    <div class="flex h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 overflow-hidden">
      <!-- Sidebar -->
      <aside class="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col">
        <div class="p-6 border-b border-slate-200 dark:border-slate-700">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <span class="material-symbols-outlined text-white">dashboard</span>
            </div>
            <div>
              <h1 class="text-sm font-black tracking-tighter uppercase">Admin Panel</h1>
              <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest opacity-60">Management Console</p>
            </div>
          </div>
        </div>

        <nav class="flex-1 p-4 space-y-1">
          <a routerLink="/admin" routerLinkActive="bg-primary/10 text-primary" [routerLinkActiveOptions]="{exact: true}"
             class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all hover:bg-slate-100 dark:hover:bg-slate-700/50 group">
            <span class="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">analytics</span>
            Overview
          </a>
          <a routerLink="/admin/orders" routerLinkActive="bg-primary/10 text-primary"
             class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all hover:bg-slate-100 dark:hover:bg-slate-700/50 group">
            <span class="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">shopping_bag</span>
            Orders
          </a>
          <a routerLink="/admin/users" routerLinkActive="bg-primary/10 text-primary"
             class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all hover:bg-slate-100 dark:hover:bg-slate-700/50 group">
            <span class="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">group</span>
            User Manager
          </a>
        </nav>

        <div class="p-6 border-t border-slate-200 dark:border-slate-700">
          <a routerLink="/" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-500 hover:text-primary transition-all">
            <span class="material-symbols-outlined">exit_to_app</span>
            Exit Admin
          </a>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900/50">
        <header class="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-10">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-success animate-pulse"></span>
            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Admin Session: Authorized</span>
          </div>
          <div class="flex items-center gap-4">
             <!-- Top bar details if needed -->
          </div>
        </header>

        <div class="p-8">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100vh; }
    .material-symbols-outlined { font-size: 20px; }
  `]
})
export class AdminComponent {}
