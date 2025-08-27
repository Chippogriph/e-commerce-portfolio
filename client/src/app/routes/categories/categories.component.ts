import { Component, inject } from '@angular/core';
import { ProductGridComponent } from '../../shared/components/product-grid/product-grid.component';
import { Product } from '../../services/product.service';
import {
  CategoriesService,
  Category,
} from '../../services/categories/categories.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, ProductGridComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  products: Product[] = [];
  displayedProducts: Product[] = [];
  category: Category | null = null;
  isLoading = true;
  categoryName: string = '';

  private categoriesService = inject(CategoriesService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (!slug) return;

      this.isLoading = true;

      this.categoriesService.getCategoryWithProducts(slug).subscribe({
        next: (data) => {
          this.category = data.category;
          this.categoryName = data.category.name;
          this.products = data.products;
          this.displayedProducts = this.products.slice(0, 8);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Fel vid hämtning av kategori och produkter:', error);
          this.isLoading = false;
        },
      });
    });
  }
}
