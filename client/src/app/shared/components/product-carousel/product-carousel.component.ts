import { Component, inject } from '@angular/core';
import { Product, ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FullImageUrlPipe } from '../../pipes/full-image-url.pipe';

@Component({
  selector: 'app-product-carousel',
  imports: [
    CommonModule,
    RouterLink,
    FullImageUrlPipe
  ],
  templateUrl: './product-carousel.component.html',
  styleUrl: './product-carousel.component.css',
})
export class ProductCarouselComponent {
  products: Product[] = [];
  isLoading = true;
  currentIndex = 0;

  private productService = inject(ProductService)

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Fel vid hämtning av produkter:', error);
        this.isLoading = false;
      },
    });
  }

  get transform(): string {
    return `-${this.currentIndex * 33.33}%`;
  }

  next() {
    if (this.currentIndex < this.products.length / 3 - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = Math.floor(this.products.length / 3) - 1;
    }
  }
}
