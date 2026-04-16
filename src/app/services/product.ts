import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, forkJoin, of } from 'rxjs';
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
    
    // Categorical logic for sizes and colors
    let sizes: (number | string)[] = [];
    let colors: string[] = [];

    const category = p.category.toLowerCase();

    if (category.includes('shoes')) {
      sizes = [6, 7, 8, 9, 10, 11];
      colors = ['Black', 'White', 'Brown', 'Midnight Blue'];
    } else if (category.includes('shirts') || category.includes('dresses') || category === 'tops' || category === 'mens-shirts' || category === 'womens-dresses') {
      sizes = ['S', 'M', 'L', 'XL', 'XXL', '3XL'];
      colors = ['Crimson', 'Navy', 'Classic White', 'Slate Gray', 'Jet Black'];
    } else if (category.includes('watches') || category.includes('accessories')) {
      colors = ['Silver', 'Gold', 'Space Gray', 'Rose Gold'];
    }

    return {
      id: p.id,
      name: p.title,
      description: p.description,
      brand: p.brand || 'Global Brand',
      gender: 'UNISEX',
      category: p.category.toUpperCase(),
      size: sizes,
      color: colors,
      price: Math.round(p.price),
      discountPrice: Math.round(p.price - discountAmount),
      is_in_inventory: p.stock > 0,
      items_left: p.stock,
      imageURL: p.thumbnail,
      slug: p.title.toLowerCase().replace(/ /g, '-')
    };
  }

  private shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  getProducts(): Observable<ProductLister[]> {
    // Fetch all products (limit=0 in DummyJSON fetches everything)
    return this.http.get<DummyResponse>(`${this.apiUrl}?limit=0`).pipe(
      map(res => {
        const products = res.products.map(p => this.mapProduct(p));
        return this.shuffleArray(products);
      })
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

  getProductsByDepartment(department: string): Observable<ProductLister[]> {
    const dept = department.toLowerCase();
    let categories: string[] = [];

    if (dept === 'fashion') {
      categories = ['mens-shirts', 'womens-dresses', 'tops', 'womens-shoes', 'mens-shoes', 'womens-bags', 'mens-watches', 'womens-watches', 'womens-jewellery', 'sunglasses'];
    } else if (dept === 'electronics') {
      categories = ['smartphones', 'laptops', 'tablets', 'mobile-accessories'];
    } else if (dept === 'home') {
      categories = ['furniture', 'home-decoration', 'kitchen-accessories'];
    } else if (dept === 'grocery') {
      categories = ['groceries'];
    } else {
      return this.getProductsByCategory(department);
    }

    const requests = categories.map(cat => this.getProductsByCategory(cat));
    
    return forkJoin(requests).pipe(
      map(responses => {
        let combined: ProductLister[] = [];
        responses.forEach(res => combined = [...combined, ...res]);
        return this.shuffleArray(combined);
      })
    );
  }

  getOffers(): Observable<ProductLister[]> {
    return this.getProducts().pipe(
      map(products => products.filter(p => {
        const discount = ((p.price - (p.discountPrice || p.price)) / p.price) * 100;
        return discount > 15; // Show items with more than 15% clear discount
      }))
    );
  }
}
