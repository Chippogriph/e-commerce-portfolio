import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../services/categories/categories.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private categoriesService = inject(CategoriesService);
  categories$ = this.categoriesService.categories$;

  ngOnInit() {
    this.categoriesService.loadCategories();
  }
}