import { Routes } from '@angular/router';
import { Container } from './container/container';
import { CartComponent } from './cart/cart.component';
import { ProductViewComponent } from './container/product-view/product-view.component';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin/dashboard/dashboard.component';
import { OrderManagerComponent } from './admin/orders/orders.component';
import { UserManagerComponent } from './admin/users/users.component';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: Container },
  { path: 'cart', component: CartComponent },
  { path: 'product/:id', component: ProductViewComponent },
  { path: 'auth', component: AuthComponent },
  { 
    path: 'admin', 
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'orders', component: OrderManagerComponent },
      { path: 'users', component: UserManagerComponent }
    ]
  }
];
