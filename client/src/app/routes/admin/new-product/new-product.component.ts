import { HttpClient } from '@angular/common/http';
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

@Component({
  selector: 'app-new-product',
  imports: [ReactiveFormsModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css',
})
export class NewProductComponent {
  private titleService = inject(Title);
  private productService = inject(ProductService);
  private router = inject(Router);

  formGroup!: FormGroup;

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
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const product = this.formGroup.value as Product;
      
      this.productService.addProduct(product).subscribe({
        next: () => {
          this.formGroup.reset();
          this.router.navigate(['/admin/products']);
        }})
    }
  }
}
