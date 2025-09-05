import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../admin-dashboard/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  CategoriesService,
  Category,
} from '../../../services/categories/categories.service';

@Component({
  selector: 'app-admin-categories',
  imports: [CommonModule, SidebarComponent, RouterLink],
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css'],
  standalone: true,
})
export class AdminCategoriesComponent {
  private categoriesService = inject(CategoriesService);

  categories: Category[] = [];
  isLoading = true;

  ngOnInit() {
    // Prenumerera på kategorier från service
    this.categoriesService.categories$.subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Fel vid hämtning av kategorier:', err);
      },
    });
  }

  removeCategory(categoryId: number) {
    if (!confirm('Är du säker på att du vill ta bort denna kategori?')) return;

    this.categoriesService.removeCategory(categoryId);
    // Eftersom removeCategory i service uppdaterar BehaviorSubject
    // så kommer categories$ automatiskt att uppdatera this.categories
  }
}
