import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Product, ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { SidebarComponent } from '../admin-dashboard/sidebar/sidebar.component';
import {
  CategoriesService,
  Category,
} from '../../../services/categories/categories.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-product',
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css',
})
export class NewProductComponent {
  private titleService = inject(Title);
  private productService = inject(ProductService);
  private router = inject(Router);
  private categoriesService = inject(CategoriesService);

  formGroup!: FormGroup;
  categories: Category[] = [];
  selectedFile: File | null = null;

  ngOnInit() {
    this.titleService.setTitle('Administration');
    this.formGroup = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(25),
      ]),
      description: new FormControl(''),
      url: new FormControl('', Validators.required),
      brand: new FormControl(''),
      sku: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Z]{3}[0-9]{3}'),
      ]),
      price: new FormControl(null),
      quantity: new FormControl(null),
      publishedDate: new FormControl(''),
      categoryId: new FormControl(null, Validators.required),
    });

    this.categoriesService.categories$.subscribe({
      next: (categories) => (this.categories = categories),
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    console.log('Clicked');
    console.log('FormGroup valid:', this.formGroup.valid);
    console.log('FormGroup value:', this.formGroup.value);
    console.log('Selected file:', this.selectedFile);
    if (this.formGroup.valid && this.selectedFile) {
      const product = this.formGroup.value as Product;

      this.productService.addProduct(product).subscribe({
        next: () => {
          this.formGroup.reset();
          this.router.navigate(['/admin/products']);
        },
      });
    }
  }
}
