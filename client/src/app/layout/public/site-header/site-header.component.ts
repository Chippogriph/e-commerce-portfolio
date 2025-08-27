import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-site-header',
  imports: [CommonModule, FormsModule, NavbarComponent, RouterLink],
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.css',
})
export class SiteHeaderComponent {
  searchQuery = '';
  cartCount = 0;

  private cartService = inject(CartService);
  private router = inject(Router);

  ngOnInit() {
    this.cartService.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });
  }

  onSearch(event: Event) {
    event.preventDefault();
    this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
    this.searchQuery = '';
  }
}
