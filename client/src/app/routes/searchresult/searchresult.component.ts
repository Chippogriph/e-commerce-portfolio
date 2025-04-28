import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductService } from '../../services/product.service';
import { ProductGridComponent } from '../../shared/components/product-grid/product-grid.component';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-searchresult',
  standalone: true,
  imports: [CommonModule,ProductGridComponent],
  templateUrl: './searchresult.component.html',
  styleUrl: './searchresult.component.css',
})
export class SearchresultComponent implements OnInit {
  searchResults: Product[] = [];
  query: string = '';
  isLoading = true;

  private route = inject(ActivatedRoute)
  private productService = inject(ProductService)
  private titleService = inject(Title)

  ngOnInit(): void {
    this.titleService.setTitle('Freaky Fashion');
    this.route.queryParamMap.subscribe((params) => {
      this.query = params.get('q') || '';
      this.searchProducts();
    });
  }

  searchProducts() {
    if (this.query.trim()) {
      this.isLoading = true;

      this.productService.searchProducts(this.query).subscribe((products) => {
        const today = new Date();

        const filteredProducts = products.filter((product) => {
          const publishedDate = new Date(product.publishedDate);
          return publishedDate <= today;
        });

        filteredProducts.forEach((product) => {
          const publishedDate = new Date(product.publishedDate);
          const daysDifference = Math.floor(
            (today.getTime() - publishedDate.getTime()) / (1000 * 60 * 60 * 24)
          );
          product.isNew = daysDifference <= 7;
        });

        this.searchResults = filteredProducts;
        this.isLoading = false;
      });
    }
  }
}