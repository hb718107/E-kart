import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ProductLister } from '../Models/Product';

interface DummyProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
}

interface DummyResponse {
  products: DummyProduct[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  private mapProduct(p: DummyProduct): ProductLister {
    const discountAmount = (p.price * p.discountPercentage) / 100;
    return {
      id: p.id,
      name: p.title,
      description: p.description,
      brand: p.brand || 'Global Brand',
      gender: 'UNISEX',
      category: p.category.toUpperCase(),
      size: [6, 7, 8, 9, 10], // Default sizes for the global marketplace
      color: ['Default'],
      price: Math.round(p.price),
      discountPrice: Math.round(p.price - discountAmount),
      is_in_inventory: p.stock > 0,
      items_left: p.stock,
      imageURL: p.thumbnail,
      slug: p.title.toLowerCase().replace(/ /g, '-')
    };
  }

  getProducts(): Observable<ProductLister[]> {
    return this.http.get<DummyResponse>(this.apiUrl).pipe(
      map(res => res.products.map(p => this.mapProduct(p)))
    );
  }

  getProductById(id: number): Observable<ProductLister> {
    return this.http.get<DummyProduct>(`${this.apiUrl}/${id}`).pipe(
      map(p => this.mapProduct(p))
    );
  }

  searchProducts(query: string): Observable<ProductLister[]> {
    return this.http.get<DummyResponse>(`${this.apiUrl}/search?q=${query}`).pipe(
      map(res => res.products.map(p => this.mapProduct(p)))
    );
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }

  getProductsByCategory(category: string): Observable<ProductLister[]> {
    return this.http.get<DummyResponse>(`${this.apiUrl}/category/${category.toLowerCase()}`).pipe(
      map(res => res.products.map(p => this.mapProduct(p)))
    );
  }
}
