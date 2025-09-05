import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Product } from '../product.service';

export interface Category {
  id: number;
  name: string;
  imageUrl: string;
  slug: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:4200/api/categories';

  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  constructor() {
    // Ladda kategorier direkt vid service-init
    this.loadCategories();
  }

  getCategoryWithProducts(
    slug: string
  ): Observable<{ category: Category; products: Product[] }> {
    const url = `${this.apiUrl}/${slug}`;
    return this.http.get<{ category: Category; products: Product[] }>(url);
  }

  loadCategories(): void {
    this.http
      .get<Category[]>(this.apiUrl)
      .pipe(take(1))
      .subscribe({
        next: (categories) => this.categoriesSubject.next(categories),
        error: (err) => console.error('Fel vid hämtning av kategorier:', err),
      });
  }

  addCategory(data: FormData): void {
    this.http
      .post<Category>(`${this.apiUrl}/new`, data)
      .pipe(take(1))
      .subscribe({
        next: (newCategory) => {
          const current = this.categoriesSubject.value;
          this.categoriesSubject.next([...current, newCategory]);
        },
        error: (err) => console.error('Fel vid skapande av kategori:', err),
      });
  }

  removeCategory(categoryId: number) {
    this.http
      .delete(`${this.apiUrl}/remove/${categoryId}`)
      .pipe(take(1))
      .subscribe({
        next: () => {
          const updated = this.categoriesSubject.value.filter(
            (c) => c.id !== categoryId
          );
          this.categoriesSubject.next(updated);
        },
        error: (err) => console.error('Fel vid radering av kategori:', err),
      });
  }
}
