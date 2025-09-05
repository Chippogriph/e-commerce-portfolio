import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../services/categories/categories.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-spots',
  imports: [CommonModule, RouterLink],
  templateUrl: './spots.component.html',
  styleUrl: './spots.component.css'
})
export class SpotsComponent implements OnInit {

  private categoriesService = inject(CategoriesService);
  categories$ = this.categoriesService.categories$;

  ngOnInit() {
    this.categoriesService.loadCategories();
  }
}
