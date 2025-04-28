import { Component, inject} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartTableComponent } from '../../shared/components/cart-table/cart-table.component';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CartTableComponent, CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
private titleService = inject(Title)
private activatedRoute = inject(ActivatedRoute)

showButton: boolean = false;

  ngOnInit() {
    this.titleService.setTitle('Kassan');
    this.activatedRoute.url.subscribe((urlSegments) => {
      this.showButton = urlSegments.some(segment => segment.path === 'cart');
    });
  }
}
