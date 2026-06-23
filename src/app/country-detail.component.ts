import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Country } from './country.model';
import { CountryService } from './country.service';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls:  ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {
  country: Country | null = null;
  borders: { cca3: string; name: string }[] = [];
  error = false;

  constructor(
    private route: ActivatedRoute,
    private svc:   CountryService
  ) {}

  ngOnInit(): void {
    const resolved = this.route.snapshot.data['country'] as Country;
    if (resolved) {
      this.country = resolved;
      this.loadBorders(resolved.borders ?? []);
    } else {
      this.error = true;
    }
  }

  private loadBorders(codes: string[]): void {
    if (!codes.length) return;
    this.svc.getAllCountries().subscribe(list => {
      this.borders = codes.map(code => ({
        cca3: code,
        name: list.find(c => c.cca3 === code)?.name.common ?? code,
      }));
    });
  }

  get currencies(): string {
    const c = this.country?.currencies;
    return c ? Object.values(c).map(v => `${v.name} (${v.symbol})`).join(', ') : '—';
  }

  get languages(): string {
    const l = this.country?.languages;
    return l ? Object.values(l).join(', ') : '—';
  }

  get callingCode(): string {
    const idd = this.country?.idd;
    if (!idd?.root) return '—';
    const s = idd.suffixes ?? [];
    if (s.length === 1) return `${idd.root}${s[0]}`;
    if (s.length > 3)   return `${idd.root} (${s.length} codes)`;
    return s.map(x => `${idd.root}${x}`).join(', ');
  }

  get gini(): string {
    const g = this.country?.gini;
    if (!g) return '—';
    const e = Object.entries(g);
    if (!e.length) return '—';
    const [yr, val] = e[e.length - 1];
    return `${(val as number).toFixed(1)} (${yr})`;
  }
}
