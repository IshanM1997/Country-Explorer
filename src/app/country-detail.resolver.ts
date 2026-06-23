import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Country } from './country.model';
import { CountryService } from './country.service';

@Injectable({ providedIn: 'root' })
export class CountryDetailResolver implements Resolve<Country> {
  constructor(private svc: CountryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Country> {
    const code = route.paramMap.get('code') ?? '';
    return this.svc.getCountryByCode(code).pipe(
      catchError(() => {
        this.router.navigate(['/not-found']);
        return EMPTY;
      })
    );
  }
}
