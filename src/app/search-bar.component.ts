import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  template: `
    <div class="sb">
      <svg class="sb__icon" width="17" height="17" viewBox="0 0 17 17" fill="none">
        <circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.6"/>
        <path d="M11.5 11.5L15 15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
      </svg>
      <input
        class="sb__input"
        type="search"
        [formControl]="searchCtrl"
        placeholder="Search countries…"
        autocomplete="off"
        aria-label="Search countries"
      />
      <button *ngIf="searchCtrl.value" class="sb__clear" (click)="clear()" aria-label="Clear">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 3l8 8M11 3L3 11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
  `,
  styles: [`
    .sb { position: relative; display: flex; align-items: center; flex: 1; max-width: 480px; }
    .sb__icon { position: absolute; left: 1rem; color: var(--text-muted); pointer-events: none; }
    .sb__input {
      width: 100%; padding: 0.625rem 2.75rem; background: var(--depth-surface);
      border: 1px solid var(--border-subtle); border-radius: var(--r-lg);
      color: var(--text-primary); font-family: var(--font-body); font-size: 0.9375rem;
      transition: border-color var(--t), box-shadow var(--t);
    }
    .sb__input::placeholder { color: var(--text-muted); }
    .sb__input:focus { outline: none; border-color: var(--border-teal); background: var(--depth-shallow); box-shadow: 0 0 0 3px var(--teal-subtle); }
    .sb__input::-webkit-search-cancel-button { -webkit-appearance: none; }
    .sb__clear {
      position: absolute; right: 0.875rem; display: flex; align-items: center;
      justify-content: center; width: 22px; height: 22px;
      background: var(--depth-reef); border: none; border-radius: 50%;
      color: var(--text-secondary); transition: all var(--t);
    }
    .sb__clear:hover { background: var(--border-teal); color: var(--teal); }
  `]
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @Output() searchChange = new EventEmitter<string>();

  searchCtrl = new FormControl('');
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.searchCtrl.valueChanges.pipe(
      debounceTime(350),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(val => this.searchChange.emit(val ?? ''));
  }

  clear(): void {
    this.searchCtrl.setValue('');
    this.searchChange.emit('');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
