import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  formGroup!: FormGroup;
  loginError: string | null = null;

  ngOnInit() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
    });
  }
  onSubmit() {
    this.loginError = null;

    if (this.formGroup.valid) {
      const { email, password } = this.formGroup.value;

      this.authService.login(email, password).subscribe({
        next: () => {
          // ✅ State sätts i AuthService (via tap), så vi behöver bara navigera
          this.router.navigate(['/']);
        },
        error: () => {
          this.loginError = 'Fel E-mail eller lösenord';
        },
      });
    } else {
      this.loginError = 'Formuläret är ogiltigt';
    }
  }
}
