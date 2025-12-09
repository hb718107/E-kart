import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductLister } from '../../../Models/Product';

@Component({
  selector: 'app-product',
  imports: [CommonModule,FormsModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
 @Input()
 product: ProductLister;
}
