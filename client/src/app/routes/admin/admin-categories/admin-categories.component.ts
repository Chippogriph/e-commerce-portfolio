import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../admin-dashboard/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoriesService, Category } from '../../../services/categories/categories.service';

@Component({
  selector: 'app-admin-categories',
  imports: [CommonModule, SidebarComponent, RouterLink],
  templateUrl: './admin-categories.component.html',
  styleUrl: './admin-categories.component.css'
})
export class AdminCategoriesComponent {

  private categoriesService = inject(CategoriesService);

  categories: Category[] = [];
  
 ngOnInit () {
  this.categoriesService.categories$.subscribe({
      next: (categories) => (this.categories = categories),
    });
 }
}
