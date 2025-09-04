import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  brand: string;
  sku: string;
  price: number;
  quantity: number;
  publishedDate: string;
  isNew: boolean;
  isFavorite?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:4200/api/products';
  private http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductBySlug(slug: string): Observable<Product> {
    const url = `${this.apiUrl}/${slug}`;
    return this.http.get<Product>(url);
  }

  searchProducts(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/search?q=${query}`);
  }

  removeProduct(productId: number) {
    return this.http.delete(`${this.apiUrl}/remove/${productId}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/new`, product);
  }
}
