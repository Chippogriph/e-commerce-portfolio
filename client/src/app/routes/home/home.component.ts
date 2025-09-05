import { Component, inject } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { ProductGridComponent } from '../../shared/components/product-grid/product-grid.component';
import { Product, ProductService } from '../../services/product.service';
import { Title } from '@angular/platform-browser';
import { FavoritesService } from '../../services/favorites/favorites.service';
import { SpotsComponent } from './spots/spots.component';

@Component({
  selector: 'app-home',
  imports: [ProductGridComponent, HeroComponent, SpotsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  products: Product[] = [];
  displayedProducts: Product[] = [];
  isLoading = true;

  private productService = inject(ProductService);
  private favoritesService = inject(FavoritesService);
  private titleService = inject(Title);

  ngOnInit() {
    this.titleService.setTitle('Freaky Fashion');

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

          this.displayedProducts = this.products.slice(0, 8);
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
