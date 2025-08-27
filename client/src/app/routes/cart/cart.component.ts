import { Component, inject} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartTableComponent } from '../../shared/components/cart-table/cart-table.component';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [CartTableComponent, CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
cartCount = 0;

private titleService = inject(Title)
private activatedRoute = inject(ActivatedRoute)
private cartService = inject(CartService);

showButton: boolean = false;

  ngOnInit() {
    this.titleService.setTitle('Kassan');
    combineLatest([
    this.activatedRoute.url,
    this.cartService.cartCount$
  ]).subscribe(([urlSegments, count]) => {
    const onCartPage = urlSegments.some(segment => segment.path === 'cart');
    this.showButton = onCartPage && count > 0;
  });
  }
}
