import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'area' })
export class AreaPipe implements PipeTransform {
  transform(value: number): string {
    if (!value && value !== 0) return '—';
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M km²`;
    if (value >= 1_000)     return `${(value / 1_000).toFixed(1)}K km²`;
    return `${value.toLocaleString()} km²`;
  }
}
