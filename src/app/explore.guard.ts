import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ExploreGuard implements CanActivate {
  canActivate(): boolean {
    // In production: inject AuthService and return authService.isLoggedIn
    return true;
  }
}
