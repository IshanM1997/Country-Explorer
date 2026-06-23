import { Component, Input } from '@angular/core';
import { CountrySummary } from './country.model';

@Component({
  selector: 'app-country-card',
  template: `
    <a class="card fade-up" [routerLink]="['/countries', country.cca3]"
      [attr.aria-label]="'View ' + country.name.common">

      <div class="card__flag-wrap">
        <img class="card__flag"
          [src]="country.flags.svg || country.flags.png"
          [alt]="country.name.common + ' flag'"
          loading="lazy" />
      </div>

      <div class="card__body">
        <div class="card__header">
          <span class="card__emoji" aria-hidden="true">{{ country.flag }}</span>
          <div class="card__names">
            <h3 class="card__name">{{ country.name.common }}</h3>
            <p class="card__official">{{ country.name.official }}</p>
          </div>
        </div>
        <span class="card__region">{{ country.region }}</span>
        <div class="card__stats">
          <div class="card__stat">
            <span class="card__stat-lbl">Capital</span>
            <span class="card__stat-val">{{ country.capital?.[0] || '—' }}</span>
          </div>
          <div class="card__stat">
            <span class="card__stat-lbl">Population</span>
            <span class="card__stat-val">{{ country.population | population }}</span>
          </div>
          <div class="card__stat">
            <span class="card__stat-lbl">Area</span>
            <span class="card__stat-val">{{ country.area | area }}</span>
          </div>
        </div>
      </div>

      <div class="card__arrow" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.75"
            stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </a>
  `,
  styles: [`
    .card {
      display: flex; flex-direction: column; background: var(--depth-mid);
      border: 1px solid var(--border-faint); border-radius: var(--r-lg);
      overflow: hidden; text-decoration: none; color: inherit;
      transition: transform var(--t) var(--ease), box-shadow var(--t) var(--ease), border-color var(--t);
      position: relative;
    }
    .card:hover { transform: translateY(-4px); box-shadow: var(--shadow-hover); border-color: var(--border-teal); }
    .card:hover .card__flag { transform: scale(1.04); }
    .card:hover .card__arrow { opacity: 1; transform: translateX(0); color: var(--teal); }
    .card:hover .card__name  { color: var(--teal); }
    .card__flag-wrap { width: 100%; aspect-ratio: 16/9; overflow: hidden; background: var(--depth-surface); }
    .card__flag { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s var(--ease); }
    .card__body { padding: 1rem; display: flex; flex-direction: column; gap: 0.625rem; flex: 1; }
    .card__header { display: flex; align-items: flex-start; gap: 0.625rem; }
    .card__emoji { font-size: 1.75rem; line-height: 1; flex-shrink: 0; }
    .card__names { min-width: 0; }
    .card__name { font-family: var(--font-display); font-size: 1.0625rem; color: var(--text-bright); line-height: 1.25; transition: color var(--t); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .card__official { font-size: 0.6875rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .card__region { display: inline-block; font-size: 0.6875rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.07em; color: var(--teal); background: var(--teal-subtle); padding: 2px 8px; border-radius: 99px; border: 1px solid var(--border-teal); width: fit-content; }
    .card__stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; border-top: 1px solid var(--border-faint); padding-top: 0.625rem; margin-top: auto; }
    .card__stat { display: flex; flex-direction: column; gap: 0.125rem; }
    .card__stat-lbl { font-size: 0.625rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); font-weight: 600; }
    .card__stat-val { font-size: 0.8125rem; color: var(--text-primary); font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .card__arrow { position: absolute; top: 0.875rem; right: 0.875rem; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; background: var(--depth-surface); border-radius: 50%; color: var(--text-muted); opacity: 0; transform: translateX(-4px); transition: all var(--t); }
  `]
})
export class CountryCardComponent {
  @Input() country!: CountrySummary;
}
