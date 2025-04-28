import { Component, inject, OnInit } from '@angular/core';
import { CartItems, CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-table',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cart-table.component.html',
  styleUrl: './cart-table.component.css',
})
export class CartTableComponent implements OnInit {
  cartItems: CartItems[] = [];
  isLoading = true;

  private cartService = inject(CartService);

  ngOnInit() {
    this.cartService.getCart().subscribe({
      next: (items: CartItems[]) => {
        this.cartItems = items;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Fel vid hämtning av varukorg:', err);
        this.isLoading = false;
      },
    });
  }

  updateQuantity(item: CartItems, change: number) {
    const newQty = item.quantity + change;
  
    if (newQty < 1) {
      return;
    }
  
    this.cartService.updateQuantity(item.id, newQty).subscribe({
      next: () => {
        item.quantity = newQty;
      }
    });
  }
  
  removeItem(productId: number) {
    this.cartService.removeFromCart(productId).subscribe(() => {
      this.cartItems = this.cartItems.filter(item => item.id !== productId);
    });
  }
  
}
