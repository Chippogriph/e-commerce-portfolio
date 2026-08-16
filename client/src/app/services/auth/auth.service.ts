import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../enviroments/enviroments.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth`;
  private http = inject(HttpClient);
  private router = inject(Router);

  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  private isAdmin = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdmin.asObservable();

  private sessionLoaded = new BehaviorSubject<boolean>(false);
  sessionLoaded$ = this.sessionLoaded.asObservable();

  constructor() {
    this.checkSession();
  }

  login(email: string, password: string) {
    return this.http
      .post<{ message: string; isAdmin: boolean }>(
        `${this.apiUrl}/login`,
        { email, password },
        { withCredentials: true }
      )
      .pipe(
        tap((res) => {
          this.loggedIn.next(true);
          this.isAdmin.next(res.isAdmin);
        })
      );
  }

  // login(email: string, password: string) {
  //   return this.http
  //     .post<{ message: string; isAdmin: boolean }>(
  //       `${this.apiUrl}/login`,
  //       { email, password },
  //       { withCredentials: true }
  //     )
  //     .subscribe({
  //       next: (res) => {
  //         console.log('Logged in');
  //         this.loggedIn.next(true);
  //         this.isAdmin.next(res.isAdmin);
  //         console.log(res.isAdmin);
  //         this.router.navigate(['/']);
  //       },
  //       error: (err) => {
  //         console.error('Login failed', err);
  //         this.loggedIn.next(false);
  //       },
  //     });
  // }

  logout() {
    return this.http
      .post(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .subscribe({
        next: () => {
          console.log('Utloggad');
          this.loggedIn.next(false);
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        },
        error: (err) => console.error(err),
      });
  }

  checkSession() {
    this.http
      .get<{ userId: number | null; isAdmin: boolean }>(
        `${this.apiUrl}/session`,
        { withCredentials: true }
      )
      .subscribe({
        next: (res) => {
          this.loggedIn.next(!!res.userId);
          this.isAdmin.next(res.isAdmin || false);
          this.sessionLoaded.next(true);
        },
        error: () => {
          this.loggedIn.next(false);
          this.isAdmin.next(false);
          this.sessionLoaded.next(true);
        },
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
