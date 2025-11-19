import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { TopHeader } from './top-header/top-header';
import { ProductList } from './product-list/product-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponent,TopHeader,ProductList],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone:true
})
export class App {
   title = 'angular-ekart';

}
