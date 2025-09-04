import { Component, inject, OnInit } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductCarouselComponent } from '../../shared/components/product-carousel/product-carousel.component';
import { CartItems, CartService } from '../../services/cart.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-details',
  imports: [ProductCarouselComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  cartItems: CartItems[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private cartService = inject(CartService);
  private titleService = inject(Title)


  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) {
        this.productService.getProductBySlug(slug).subscribe({
          next: (data) => {
            this.product = data;
            this.titleService.setTitle(this.product.name);
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Fel vid hämtning av produkt:', error);
            this.errorMessage = 'Produkten kunde inte hämtas.';
            this.isLoading = false;
          },
        });
      }
    });
  }

  

  addProductToCart(product: Product) {
    this.cartService.addToCart({
      id: 0,
      slug: product.slug,
      name: product.name,
      url: product.imageUrl,
      brand: product.brand,
      price: product.price,
      quantity: 1
    }).subscribe({
      next: (updatedCart) => {
        console.log('Varukorgen uppdaterad:', updatedCart);
      },
      error: (err) => {
        console.error('Fel vid tillägg till varukorg:', err);
      }
    });
  }
}
