import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { combineLatest, filter, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate() {
  return combineLatest([
    this.authService.isAdmin$,
    this.authService.sessionLoaded$,
  ]).pipe(
    // vänta tills sessionLoaded är true
    filter(([_, loaded]) => loaded),
    take(1),
    map(([isAdmin]) => {
      if (!isAdmin) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    })
  );
}

}
