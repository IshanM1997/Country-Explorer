import { Component, Output, EventEmitter } from '@angular/core';

export const REGIONS = ['All', 'Africa', 'Americas', 'Antarctic', 'Asia', 'Europe', 'Oceania'] as const;
export type Region = typeof REGIONS[number];

@Component({
  selector: 'app-region-filter',
  template: `
    <div class="rf" role="tablist" aria-label="Filter by region">
      <button
        *ngFor="let r of regions"
        class="rf__btn"
        [class.active]="selected === r"
        (click)="select(r)"
        role="tab"
        [attr.aria-selected]="selected === r">
        {{ r }}
      </button>
    </div>
  `,
  styles: [`
    .rf { display: flex; gap: 0.375rem; flex-wrap: wrap; }
    .rf__btn {
      padding: 0.4rem 0.875rem; background: var(--depth-surface);
      border: 1px solid var(--border-subtle); border-radius: 99px;
      color: var(--text-secondary); font-family: var(--font-body);
      font-size: 0.8125rem; font-weight: 500; transition: all 0.18s;
    }
    .rf__btn:hover  { border-color: var(--border-teal); color: var(--teal); }
    .rf__btn.active { background: var(--teal-glow); border-color: var(--teal); color: var(--teal); }
  `]
})
export class RegionFilterComponent {
  @Output() regionChange = new EventEmitter<Region>();
  readonly regions = REGIONS;
  selected: Region = 'All';
  select(r: Region): void { this.selected = r; this.regionChange.emit(r); }
}
