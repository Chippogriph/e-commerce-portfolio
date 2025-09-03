import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:4200/api/auth';
  private http = inject(HttpClient);
  private router = inject(Router);

  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor() {
    this.checkSession();
  }

  login(email: string, password: string) {
    return this.http
      .post(
        `${this.apiUrl}/login`,
        { email, password },
        { withCredentials: true }
      )
      .subscribe({
        next: (res) => {
          console.log('Logged in');
          this.loggedIn.next(true);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Login failed', err);
          this.loggedIn.next(false);
        },
      });
  }

  logout() {
    return this.http
      .post(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .subscribe({
        next: () => {
          console.log('Utloggad');
          this.loggedIn.next(false);
        },
        error: (err) => console.error(err),
      });
  }

  checkSession() {
    this.http
      .get<{ userId: number | null }>(`${this.apiUrl}/session`, {
        withCredentials: true,
      })
      .subscribe((res) => {
        this.loggedIn.next(!!res.userId);
      });
  }

  isLoggedIn(): boolean {
    return this.loggedIn.getValue();
  }

  register(username: string, email: string, password: string) {
    return this.http.post(
      `${this.apiUrl}/register`,
      { username, email, password },
      { withCredentials: true }
    );
  }
}
