import { Component, inject } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { ProductGridComponent } from '../../shared/components/product-grid/product-grid.component';
import { Product, ProductService } from '../../services/product.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  imports: [ProductGridComponent, HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  products: Product[] = [];
  displayedProducts: Product[] = [];
  isLoading = true;

  private productService = inject(ProductService);
  private titleService = inject(Title)

  
    
  

  ngOnInit() {
    this.titleService.setTitle('Freaky Fashion');
    this.productService.getProducts().subscribe({
      next: (data) => {
        const today = new Date();

        const validProducts = data.filter((product) => {
          const publishedDate = new Date(product.publishedDate);
          return publishedDate <= today;
        });

        validProducts.forEach((product) => {
          const publishedDate = new Date(product.publishedDate);
          const diffInDays = Math.floor(
            (today.getTime() - publishedDate.getTime()) / (1000 * 60 * 60 * 24)
          );
          product.isNew = diffInDays <= 7;
        });

        this.products = validProducts;
        this.displayedProducts = this.products.slice(0, 8);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Fel vid hämtning av produkter:', error);
        this.isLoading = false;
      },
    });
  }
}
