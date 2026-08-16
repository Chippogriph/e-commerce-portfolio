import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../services/categories/categories.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FullImageUrlPipe } from '../../../shared/pipes/full-image-url.pipe';

@Component({
  selector: 'app-spots',
  imports: [CommonModule, RouterLink, FullImageUrlPipe],
  templateUrl: './spots.component.html',
  styleUrl: './spots.component.css',
})
export class SpotsComponent implements OnInit {
  private categoriesService = inject(CategoriesService);
  categories$ = this.categoriesService.categories$;

  ngOnInit() {
    this.categoriesService.loadCategories();
  }
}
