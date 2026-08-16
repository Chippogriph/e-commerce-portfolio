import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../services/product.service';
import { RouterLink } from '@angular/router';
import { FavoritesService } from '../../../services/favorites/favorites.service';
import { FullImageUrlPipe } from '../../pipes/full-image-url.pipe';


@Component({
  selector: 'app-product-card',
  imports: [
    CommonModule,
    RouterLink,
    FullImageUrlPipe
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product: Product = {} as Product;
  @Input() showNewBadge: boolean = false;

  private favoritesService = inject(FavoritesService)

  toggleFavorite() {
    this.favoritesService.toggleFavorite(this.product);
  }

  isFavorite(): boolean {
    return this.favoritesService.isFavorite(this.product);
  }
}
