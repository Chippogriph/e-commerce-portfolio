import { Component, inject } from '@angular/core';
import { ProductGridComponent } from '../../shared/components/product-grid/product-grid.component';
import { Product, ProductService } from '../../services/product.service';
import { FavoritesService } from '../../services/favorites/favorites.service';

@Component({
  selector: 'app-news',
  imports: [ProductGridComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent {
  products: Product[] = [];
  newProducts: Product[] = [];
  displayedProducts: Product[] = [];
  isLoading = true;

  private productService = inject(ProductService);
  private favoritesService = inject(FavoritesService);

  ngOnInit() {
    // Hämta produkter direkt från backend, redan med isNew flaggat
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.favoritesService.loadFavorites();

        // Koppla favorites till produkterna
        this.favoritesService.favoritesList$.subscribe((favorites) => {
          this.products = data.map((product) => ({
            ...product,
            isFavorite: favorites.some((f) => f.id === product.id),
          }));

          const newProducts = this.products.filter((p) => p.isNew);
          this.displayedProducts = newProducts.slice(0, 8);
          this.isLoading = false;
        });
      },
      error: (error) => {
        console.error('Fel vid hämtning av produkter:', error);
        this.isLoading = false;
      },
    });
  }

  toggleFavorite(product: Product) {
    this.favoritesService.toggleFavorite(product);
    product.isFavorite = !product.isFavorite; // uppdatera direkt i UI
  }
}
