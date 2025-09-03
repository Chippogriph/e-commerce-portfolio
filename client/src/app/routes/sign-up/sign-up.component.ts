import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
private authService = inject(AuthService)
private router = inject(Router)

  formGroup!: FormGroup;

  ngOnInit() {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
  if (this.formGroup.valid) {
    const { username, email, password } = this.formGroup.value;

    this.authService.register(username, email, password).subscribe({
      next: (res) => {
        console.log("User registered:", res);

        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error("Registration failed:", err);
      }
    });
  }
}
}
