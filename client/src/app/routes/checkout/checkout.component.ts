import { Component, inject } from '@angular/core';
import { CartTableComponent } from '../../shared/components/cart-table/cart-table.component';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  imports: [CartTableComponent, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  private titleService = inject(Title);
  private cartService = inject(CartService);
  private router = inject(Router);

  checkoutForm!: FormGroup;

  ngOnInit() {
    this.titleService.setTitle('Kassan');

    this.checkoutForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      street: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      newsletter: new FormControl(false),
    });
  }

  onCheckout() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    this.cartService.checkout(this.checkoutForm.value).subscribe({
      next: (response: any) => {
        this.router.navigate(['/order/confirmation'], {
          state: {
            order: response.order,
            orderItems: response.orderItems,
            customer: this.checkoutForm.value,
          },
        });
      },
      error: (err) => {
        console.error('Checkout failed', err);
        alert('Checkout misslyckades, försök igen');
      },
    });
  }
}
