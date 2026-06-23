import { Component } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="global-bar" [class.global-bar--active]="(loading.isLoading$ | async)"></div>
    <nav class="nav">
      <div class="nav__inner">
        <a class="nav__brand" routerLink="/">
          <span class="nav__globe">🌍</span>
          <span class="nav__word">Country Explorer</span>
        </a>
        <span class="nav__credit">
          Data: <a href="https://restcountries.com" target="_blank" rel="noopener">REST Countries</a>
        </span>
      </div>
    </nav>
    <main><router-outlet></router-outlet></main>
  `,
  styles: [`
    .global-bar { position: fixed; top: 0; left: 0; height: 2px; width: 0%; background: linear-gradient(90deg, var(--teal), var(--sand)); z-index: 9999; opacity: 0; transition: opacity 0.3s; }
    .global-bar--active { opacity: 1; width: 75%; animation: loadBar 1.8s ease-in-out infinite; }
    .nav { position: sticky; top: 0; z-index: 200; background: rgba(10,14,26,0.88); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border-faint); }
    .nav__inner { max-width: 1280px; margin: 0 auto; padding: 0 1.5rem; height: 56px; display: flex; align-items: center; justify-content: space-between; }
    .nav__brand { display: flex; align-items: center; gap: 0.5rem; text-decoration: none; }
    .nav__globe  { font-size: 1.375rem; line-height: 1; }
    .nav__word   { font-family: var(--font-display); font-size: 1.0625rem; color: var(--text-bright); }
    .nav__credit { font-size: 0.75rem; color: var(--text-muted); }
    .nav__credit a { color: var(--teal); text-decoration: none; }
    .nav__credit a:hover { text-decoration: underline; }
  `]
})
export class AppComponent {
  constructor(public loading: LoadingService) {}
}
