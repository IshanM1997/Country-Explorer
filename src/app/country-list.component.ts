import { Component, OnInit } from '@angular/core';
import { CountryService } from './country.service';
import { CountrySummary } from './country.model';
import { Region } from './region-filter.component';

@Component({
  selector: 'app-country-list',
  template: `
    <div class="list-page">

      <!-- Hero -->
      <header class="hero">
        <p class="hero__eyebrow">World Atlas</p>
        <h1 class="hero__title">Explore Every Country</h1>
        <p class="hero__sub">{{ filtered.length }} of {{ all.length }} countries</p>
      </header>

      <!-- Controls -->
      <div class="controls">
        <app-search-bar (searchChange)="onSearch($event)"></app-search-bar>
        <app-region-filter (regionChange)="onRegion($event)"></app-region-filter>
      </div>

      <!-- Loading -->
      <div *ngIf="loading" class="spinner-wrap">
        <div class="spinner"></div>
        <p class="spinner__label">Loading countries…</p>
      </div>

      <!-- Error -->
      <div *ngIf="!loading && error" class="error-state">
        <p class="error-state__title">Couldn't reach the API</p>
        <p class="error-state__msg">Check your connection and try again.</p>
        <button class="retry-btn" (click)="load()">Retry</button>
      </div>

      <!-- Empty -->
      <div *ngIf="!loading && !error && filtered.length === 0" class="empty">
        <span class="empty__globe">🌐</span>
        <p class="empty__msg">No countries match your search.</p>
        <p class="empty__hint">Try a different name, capital, or region.</p>
      </div>

      <!-- Grid -->
      <div *ngIf="!loading && !error && filtered.length > 0" class="grid">
        <app-country-card
          *ngFor="let c of filtered"
          [country]="c">
        </app-country-card>
      </div>

    </div>
  `,
  styles: [`
    .list-page { max-width: 1280px; margin: 0 auto; padding: 0 1.5rem 4rem; }
    .hero { padding: 3rem 0 2rem; max-width: 600px; }
    .hero__eyebrow { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--teal); margin-bottom: 0.5rem; }
    .hero__title { font-family: var(--font-display); font-size: clamp(2rem, 5vw, 3rem); color: var(--text-bright); line-height: 1.1; margin-bottom: 0.5rem; }
    .hero__sub { font-size: 0.9rem; color: var(--text-secondary); }
    .controls { display: flex; align-items: flex-start; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border-faint); }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.25rem; }
    .spinner-wrap { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; min-height: 50vh; justify-content: center; }
    .spinner { width: 40px; height: 40px; border: 3px solid var(--depth-shallow); border-top-color: var(--teal); border-radius: 50%; animation: spin 0.9s linear infinite; }
    .spinner__label { font-size: 0.875rem; color: var(--text-secondary); }
    .error-state { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; padding: 5rem 1rem; text-align: center; }
    .error-state__title { font-family: var(--font-display); font-size: 1.25rem; color: var(--text-bright); }
    .error-state__msg   { font-size: 0.9rem; color: var(--text-secondary); }
    .retry-btn { margin-top: 0.5rem; padding: 0.5rem 1.25rem; background: var(--teal-glow); border: 1px solid var(--border-teal); color: var(--teal); border-radius: var(--r-md); font-size: 0.875rem; font-weight: 500; transition: background 0.2s; }
    .retry-btn:hover { background: rgba(34,211,200,0.2); }
    .empty { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; padding: 5rem 1rem; text-align: center; }
    .empty__globe { font-size: 3rem; filter: grayscale(0.5) opacity(0.6); margin-bottom: 0.5rem; }
    .empty__msg   { font-family: var(--font-display); font-size: 1.125rem; color: var(--text-primary); }
    .empty__hint  { font-size: 0.875rem; color: var(--text-muted); }
    @media (max-width: 640px) { .list-page { padding: 0 1rem 3rem; } .grid { grid-template-columns: 1fr; } .controls { flex-direction: column; } }
  `]
})
export class CountryListComponent implements OnInit {
  all:      CountrySummary[] = [];
  filtered: CountrySummary[] = [];
  loading = true;
  error   = false;

  private query  = '';
  private region: Region = 'All';

  constructor(private svc: CountryService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.error   = false;
    this.svc.getAllCountries().subscribe({
      next: data => { this.all = data; this.loading = false; this.applyFilters(); },
      error: ()  => { this.loading = false; this.error = true; }
    });
  }

  onSearch(q: string): void    { this.query  = q; this.applyFilters(); }
  onRegion(r: Region): void    { this.region = r; this.applyFilters(); }

  private applyFilters(): void {
    let list = [...this.all];
    if (this.region !== 'All') {
      list = list.filter(c => c.region === this.region);
    }
    const q = this.query.toLowerCase().trim();
    if (q) {
      list = list.filter(c =>
        c.name.common.toLowerCase().includes(q) ||
        c.name.official.toLowerCase().includes(q) ||
        (c.capital?.[0] ?? '').toLowerCase().includes(q) ||
        (c.subregion ?? '').toLowerCase().includes(q)
      );
    }
    this.filtered = list.sort((a, b) => a.name.common.localeCompare(b.name.common));
  }
}
