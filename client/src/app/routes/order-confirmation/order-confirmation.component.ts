import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  imports: [CommonModule, RouterLink],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.css',
})
export class OrderConfirmationComponent implements OnInit {
  order: any;
  orderItems: any[] = [];
  customer: any = {}

  private router = inject(Router);

  ngOnInit(): void {
    this.order = history.state.order;
    this.orderItems = history.state.orderItems || [];
    this.customer = history.state.customer || {};
    if (!this.order) {
      // Om ingen orderdata finns, t.ex. direkt navigering till sidan
      this.router.navigate(['/checkout']);
    }
  }
}
