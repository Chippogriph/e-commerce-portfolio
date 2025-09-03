import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-grid',
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.css',
})
export class ProductGridComponent {
  @Input() products: Product[] = [];
  @Input() displayedProducts: Product[] = [];
  @Input() searchResults: Product[] = [];
  @Input() isLoading!: boolean;
  @Input() showNewBadge: boolean = false;
  @Input() pageSize: number = 8;

  get itemsToDisplay(): Product[] {
    return this.searchResults.length > 0
      ? this.searchResults
      : this.displayedProducts;
  }

  loadMore() {
    const nextBatch = this.products.slice(
      this.displayedProducts.length,
      this.displayedProducts.length + this.pageSize
    );
    this.displayedProducts = [...this.displayedProducts, ...nextBatch];
  }
}
