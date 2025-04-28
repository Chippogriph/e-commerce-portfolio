import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-site-header',
  imports: [
    FormsModule,
    NavbarComponent,
    RouterLink],
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.css'
})
export class SiteHeaderComponent {
  searchQuery = '';

  
  private router = inject(Router)
  
  onSearch(event: Event) {
    event.preventDefault();
    this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
    this.searchQuery = "";
  }
  
}
