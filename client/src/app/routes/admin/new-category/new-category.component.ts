import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../admin-dashboard/sidebar/sidebar.component';
import { CategoriesService } from '../../../services/categories/categories.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-category',
  imports: [CommonModule, SidebarComponent, ReactiveFormsModule],
  templateUrl: './new-category.component.html',
  styleUrl: './new-category.component.css',
})
export class NewCategoryComponent {
  private categoriesService = inject(CategoriesService);
  private router = inject(Router);

  formGroup!: FormGroup;
  selectedFile: File | null = null;

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(25),
      ]),
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    console.log('Clicked');
    console.log('FormGroup valid:', this.formGroup.valid);
    console.log('FormGroup value:', this.formGroup.value);
    console.log('Selected file:', this.selectedFile);
    if (this.formGroup.valid && this.selectedFile) {
      const formData = new FormData();

      // Lägg till alla FormControl-värden
      Object.keys(this.formGroup.value).forEach((key) => {
        formData.append(key, this.formGroup.get(key)?.value);
      });

      // Lägg till filen
      formData.append('imageUrl', this.selectedFile);

      this.categoriesService.addCategory(formData);

      // Reset
      this.formGroup.reset();
      this.selectedFile = null;
      this.router.navigate(['/admin/categories']);
    }
  }
}
