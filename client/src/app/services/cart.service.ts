import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface CartItems {
  id: number;
  slug: string;
  name: string;
  url: string;
  brand: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:4200/api/cart';
  private http = inject(HttpClient);

  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  constructor() {
    this.loadCartCount();
  }

  getCart(): Observable<CartItems[]> {
    return this.http.get<CartItems[]>(this.apiUrl).pipe(
      tap((items) => {
        const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
        this.cartCount.next(totalCount);
      })
    );
  }

  addToCart(item: CartItems): Observable<CartItems> {
    return this.http.post<CartItems>(`${this.apiUrl}/add`, item).pipe(
      tap(() => {
        this.incrementCount(item.quantity);
      })
    );
  }

  updateQuantity(productId: number, quantity: number): Observable<CartItems[]> {
  return this.http
    .put<CartItems[]>(`${this.apiUrl}/update/${productId}`, { quantity })
    .pipe(
      tap(() => {
        this.loadCartCount();
      })
    );
}


  removeFromCart(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${productId}`).pipe(
      tap(() => {
        this.loadCartCount();
      })
    );
  }

  checkout(): Observable<any> {
  return this.http.post(`${this.apiUrl}/checkout`, {}).pipe(
    tap(() => {
      this.loadCartCount(); // uppdatera varukorgsikonen
    })
  );
}


  private loadCartCount() {
    this.http.get<CartItems[]>(this.apiUrl).subscribe((items) => {
      const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
      this.cartCount.next(totalCount);
    });
  }

  private incrementCount(quantity: number) {
    const current = this.cartCount.value;
    this.cartCount.next(current + quantity);
  }
}
