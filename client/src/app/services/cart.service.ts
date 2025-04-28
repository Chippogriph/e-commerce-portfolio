import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CartItems {
  id: number,
  slug: string,
  name: string,
  url: string,
  brand: string,
  price: number,
  quantity: number
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:4200/api/cart';
  private http = inject(HttpClient)

  getCart(): Observable<CartItems[]> {
    return this.http.get<CartItems[]>(this.apiUrl);
  }

  addToCart(item: CartItems) {
    return this.http.post<CartItems>(`${this.apiUrl}/add`, item);
  }
  

  updateQuantity(productId: number, quantity: number) {
    return this.http.put(`${this.apiUrl}/update/${productId}`, { quantity });
  }
  
  removeFromCart(productId: number) {
    return this.http.delete(`${this.apiUrl}/remove/${productId}`);
  }
  
}
