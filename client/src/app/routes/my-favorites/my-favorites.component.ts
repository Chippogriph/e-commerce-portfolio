import { Component, inject } from '@angular/core';
import { ProductGridComponent } from '../../shared/components/product-grid/product-grid.component';
import { CommonModule } from '@angular/common';
import { Product } from '../../services/product.service';
import { FavoritesService } from '../../services/favorites/favorites.service';

@Component({
  selector: 'app-my-favorites',
  imports: [CommonModule, ProductGridComponent],
  templateUrl: './my-favorites.component.html',
  styleUrl: './my-favorites.component.css'
})
export class MyFavoritesComponent {
  products: Product [] = [];
  displayedProducts: Product [] = [];
  isLoading = true;

  private favoritesService = inject(FavoritesService)

   ngOnInit() {
    // hämta favoriter från service
    this.favoritesService.favoritesList$.subscribe((list) => {
      this.products = list;
      this.displayedProducts = this.products.slice(0, 8);
      this.isLoading = false;

    });

    // se till att listan laddas när komponenten öppnas
    this.favoritesService.loadFavorites();
  }

  remove(product: Product) {
    this.favoritesService.toggleFavorite(product);
  }
}
