import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="nf">
      <span class="nf__globe">🌐</span>
      <h1 class="nf__title">404 — Off the Map</h1>
      <p class="nf__msg">This page doesn't exist in our atlas.</p>
      <a class="nf__home" routerLink="/">Back to Explorer</a>
    </div>
  `,
  styles: [`
    .nf { min-height: 80vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.75rem; padding: 2rem; text-align: center; }
    .nf__globe { font-size: 3.5rem; margin-bottom: 0.5rem; }
    .nf__title { font-family: var(--font-display); font-size: 2rem; color: var(--text-bright); }
    .nf__msg   { font-size: 0.9rem; color: var(--text-secondary); }
    .nf__home  { margin-top: 0.5rem; padding: 0.5rem 1.25rem; background: var(--teal-glow); border: 1px solid var(--border-teal); color: var(--teal); border-radius: var(--r-md); font-size: 0.875rem; font-weight: 500; transition: background 0.2s; }
    .nf__home:hover { background: rgba(34,211,200,0.2); }
  `]
})
export class NotFoundComponent {}
