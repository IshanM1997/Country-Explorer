import { Routes } from '@angular/router';
import { exploreGuard } from './explore.guard';
import { countryDetailResolver } from './country-detail.resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'countries', pathMatch: 'full' },
  {
    path: 'countries',
    canActivate: [exploreGuard],
    loadComponent: () => import('./country-list.component').then(m => m.CountryListComponent),
  },
  {
    path: 'countries/:code',
    canActivate: [exploreGuard],
    loadComponent: () => import('./country-detail.component').then(m => m.CountryDetailComponent),
    resolve: { country: countryDetailResolver },
  },
  {
    path: 'not-found',
    loadComponent: () => import('./not-found.component').then(m => m.NotFoundComponent),
  },
  { path: '**', redirectTo: 'not-found' },
];
