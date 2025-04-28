import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Product, ProductService } from '../../../services/product.service';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  products: Product[] = [];

  private productService = inject(ProductService);
  private titleService = inject(Title);

  ngOnInit() {
    this.titleService.setTitle('Administration');
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      console.log(products)
    });
  }

  removeProduct(productId: number) {
    this.productService.removeProduct(productId).subscribe(() => {
      this.products = this.products.filter(product => product.id !== productId);
    });
  }
}
