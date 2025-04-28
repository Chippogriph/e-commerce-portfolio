import { Component, inject } from '@angular/core';
import { CartTableComponent } from '../../shared/components/cart-table/cart-table.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-checkout',
  imports: [CartTableComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  private titleService = inject(Title)

  ngOnInit() {
    this.titleService.setTitle('Kassan');
  }
}
