import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private profile: ProfileService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.profile.isAdmin$.pipe(
      take(1),
      map(isAdmin => {
        if (!isAdmin) {
          console.warn('STARK SECURITY: Route blocked. Level 10 Clearance required.');
          this.router.navigate(['/']);
          return false;
        }
        return true;
      })
    );
  }
}
