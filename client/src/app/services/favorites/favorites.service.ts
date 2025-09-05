import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../product.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private apiUrl = 'http://localhost:4200/api/favorites';
  private http = inject(HttpClient);

  private favoritesList = new BehaviorSubject<Product[]>([]);
  favoritesList$ = this.favoritesList.asObservable();

  // Ladda favoriter från backend (Express-session)
  loadFavorites() {
    this.http
      .get<Product[]>(this.apiUrl, { withCredentials: true })
      .subscribe((favorites) => {
        this.favoritesList.next(favorites);
      });
  }

  // Lägg till eller ta bort favorit
  toggleFavorite(product: Product) {
    const current = this.favoritesList.getValue();
    const exists = current.find((p) => p.id === product.id);

    const updated = exists
      ? current.filter((p) => p.id !== product.id)
      : [...current, product];

    this.favoritesList.next(updated);

    if (exists) {
      this.removeFavorite(product);
    } else {
      this.addFavorite(product);
    }
  }

  isFavorite(product: Product): boolean {
    return this.favoritesList.getValue().some((p) => p.id === product.id);
  }

  private addFavorite(product: Product) {
    this.http
      .post(this.apiUrl, { productId: product.id }, { withCredentials: true })
      .subscribe();
  }

  private removeFavorite(product: Product) {
    this.http
      .delete(`${this.apiUrl}/${product.id}`, { withCredentials: true })
      .subscribe();
  }
}