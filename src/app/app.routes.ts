import { Routes } from '@angular/router';
import { Container } from './container/container';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
  { path: '', component: Container },
  { path: 'cart', component: CartComponent }
];
