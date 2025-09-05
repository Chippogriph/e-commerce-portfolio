import { Component, inject } from '@angular/core';
import { CartTableComponent } from '../../shared/components/cart-table/cart-table.component';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [CartTableComponent, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  private titleService = inject(Title)
  private cartService = inject(CartService)
  private router = inject(Router)

  ngOnInit() {
    this.titleService.setTitle('Kassan');
  }

  onCheckout() {
  this.cartService.checkout().subscribe(() => {
    this.router.navigate(['/order/confirmation']);
  });
}
}
