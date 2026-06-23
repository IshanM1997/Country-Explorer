# 🌍 Country Explorer — Angular World Atlas

![Angular](https://img.shields.io/badge/Angular-17-DD0031?style=flat-square&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?style=flat-square&logo=typescript&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-7.8-B7178C?style=flat-square&logo=reactivex&logoColor=white)
![REST Countries](https://img.shields.io/badge/API-REST_Countries_v3-22d3c8?style=flat-square)
![Lazy Loading](https://img.shields.io/badge/Routes-Lazy_Loaded-4CAF50?style=flat-square)
![SCSS](https://img.shields.io/badge/SCSS-Styled-CC6699?style=flat-square&logo=sass&logoColor=white)

---

## 📖 About

**Country Explorer** is an Angular 17 single-page application that lets you browse, search, and explore detailed information about every country on Earth. It pulls live data from the free REST Countries API — no API key needed — and presents it across a searchable card grid and a rich per-country detail page.

The project is built as a hands-on reference for Angular's HTTP and routing ecosystem: `HttpClient` with field-filtered requests, lazy-loaded routes, a `ResolveFn` that pre-fetches country data before the page renders, a functional `CanActivateFn` guard, and an `HttpInterceptorFn` that drives a global loading bar. On the reactive side it demonstrates RxJS operators — `debounceTime`, `distinctUntilChanged`, `shareReplay` — alongside Angular Signals for local component state. Every architectural decision is traceable to a specific Angular concept.

---

## 🏷️ Topics

> Add these under **Repository → Settings → Topics** on GitHub so the project is discoverable:

```
angular angular17 typescript scss rxjs rxjs-operators httpclient
angular-router lazy-loading resolver guard interceptor
signals custom-pipes rest-api spa world-atlas country-explorer
standalone-components frontend web-app
```

---

## 📸 Preview

```
╔══════════════════════════════════════════════════════════════╗
║  🌍 Country Explorer              Data: REST Countries       ║
╠══════════════════════════════════════════════════════════════╣
║  World Atlas                                                 ║
║  Explore Every Country          250 of 250 countries        ║
║                                                              ║
║  🔍 Search countries…                                        ║
║  [All][Africa][Americas][Antarctic][Asia][Europe][Oceania]  ║
║                                                              ║
║  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    ║
║  │🇦🇺 flag  │  │🇧🇷 flag  │  │🇨🇦 flag  │  │🇩🇪 flag  │    ║
║  │Australia │  │ Brazil   │  │ Canada   │  │ Germany  │    ║
║  │ Oceania  │  │ Americas │  │ Americas │  │ Europe   │    ║
║  └──────────┘  └──────────┘  └──────────┘  └──────────┘    ║
╚══════════════════════════════════════════════════════════════╝
```

---

## ✨ Features

| Feature | Details |
|---|---|
| **List page** | Card grid — flag image, emoji, capital, population, area |
| **Detail page** | Full profile pre-fetched by `ResolveFn` before render |
| **Debounced search** | `debounceTime(350)` + `distinctUntilChanged()` via RxJS |
| **Region filter** | Pill tabs — Africa / Americas / Antarctic / Asia / Europe / Oceania |
| **Lazy loading** | All route components loaded on demand via `loadComponent` |
| **Resolver** | `countryDetailResolver` pre-fetches before component activates |
| **Guard** | `exploreGuard` — `CanActivateFn` pattern |
| **Interceptor** | `loadingInterceptor` drives the teal gradient progress bar |
| **Custom pipes** | `PopulationPipe` (1.4B / 25M) and `AreaPipe` (9.5M km²) |
| **In-memory cache** | `shareReplay(1)` — list never re-fetches on back navigation |
| **Bordering countries** | Chips that navigate directly to each neighbour |
| **Maps** | Google Maps + OpenStreetMap deep links per country |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 17 (Standalone Components) |
| Language | TypeScript 5.2 |
| Styling | SCSS with CSS custom properties |
| HTTP | Angular HttpClient + HttpInterceptorFn |
| Routing | Angular Router — lazy `loadComponent`, `ResolveFn`, `CanActivateFn` |
| Reactivity | RxJS 7.8 · Angular Signals |
| Data | REST Countries API v3.1 (free, no key) |
| Fonts | DM Serif Display (display) · DM Sans (body) |

---

## 🏗 File Structure

All source files live **flat** inside `src/app/` — no sub-folders.

```
country-explorer/
├── angular.json
├── package.json
├── tsconfig.json
├── tsconfig.app.json
└── src/
    ├── index.html
    ├── main.ts
    ├── styles.scss                    ← Ocean-depth design tokens + keyframes
    └── app/
        ├── app.component.ts           ← Root shell: sticky nav + loading bar
        ├── app.config.ts              ← provideRouter + provideHttpClient + interceptor
        ├── app.routes.ts              ← Lazy routes + resolver + guard wired up
        ├── country.model.ts           ← Country, CountrySummary, sub-interfaces
        ├── country.service.ts         ← HttpClient, field-filtered requests, cache
        ├── loading.service.ts         ← Signal-based global loading counter
        ├── loading.interceptor.ts     ← HttpInterceptorFn → loading bar
        ├── explore.guard.ts           ← CanActivateFn (demo)
        ├── country-detail.resolver.ts ← ResolveFn<Country> with 404 redirect
        ├── population.pipe.ts         ← 1.4B / 25.3M / 800K formatter
        ├── area.pipe.ts               ← 9.5M km² / 377K km² formatter
        ├── search-bar.component.ts    ← Debounced FormControl (RxJS)
        ├── region-filter.component.ts ← Pill tabs for region filtering
        ├── country-card.component.ts  ← Card with flag image + stats
        ├── country-list.component.ts  ← Grid page (lazily loaded)
        ├── country-detail.component.ts← Detail page (lazily loaded, resolver-fed)
        └── not-found.component.ts     ← 404 page (lazily loaded)
```

---

## 🧠 Angular Concepts Demonstrated

### HttpClient + field filtering
```typescript
const params = new HttpParams().set('fields', 'cca3,name,flag,flags,capital,region,population');
this.http.get<CountrySummary[]>('https://restcountries.com/v3.1/all', { params })
```

### Lazy-loaded Routes
```typescript
{
  path: 'countries',
  loadComponent: () => import('./country-list.component').then(m => m.CountryListComponent),
}
```

### ResolveFn
```typescript
export const countryDetailResolver: ResolveFn<Country> = (route) =>
  inject(CountryService).getCountryByCode(route.paramMap.get('code')!).pipe(
    catchError(() => { inject(Router).navigate(['/not-found']); return EMPTY; })
  );
```

### CanActivateFn (Guard)
```typescript
export const exploreGuard: CanActivateFn = () => true;
// Replace with: return inject(AuthService).isAuthenticated$
```

### HttpInterceptorFn
```typescript
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(LoadingService);
  loading.show();
  return next(req).pipe(finalize(() => loading.hide()));
};
```

### RxJS Debounced Search
```typescript
this.searchCtrl.valueChanges.pipe(
  debounceTime(350),
  distinctUntilChanged(),
  takeUntil(this.destroy$)
).subscribe(val => this.searchChange.emit(val ?? ''));
```

### Custom Pipes
```typescript
@Pipe({ name: 'population', standalone: true })
export class PopulationPipe implements PipeTransform {
  transform(value: number): string { ... }
}
// Template: {{ country.population | population }}
// Output:   "1.44B" / "25.3M" / "800K"
```

---

## 🚀 Setup

```bash
# 1. Unzip and enter the project
unzip country-explorer.zip
cd country-flat

# 2. Install dependencies
npm install

# 3. Start the dev server
npm start
# → http://localhost:4200

# 4. Build for production
npm run build
```

### URL map

| URL | Page |
|---|---|
| `/` | Redirects to `/countries` |
| `/countries` | Browse all 250 countries |
| `/countries/DEU` | Germany detail (pre-fetched by resolver) |
| `/countries/JPN` | Japan detail |
| `/not-found` | 404 page |

---

## 🎨 Design Tokens

| Variable | Value | Usage |
|---|---|---|
| `--depth-ocean` | `#0a0e1a` | Page background |
| `--depth-mid` | `#111827` | Cards |
| `--depth-surface` | `#1a2235` | Inputs, panels |
| `--teal` | `#22d3c8` | Primary accent |
| `--sand` | `#f5c842` | Loading bar |
| `--font-display` | DM Serif Display | Country names |
| `--font-body` | DM Sans | All UI text |

---

## 📡 API

Uses [REST Countries v3.1](https://restcountries.com) — free, no API key required.

| Endpoint | Used for |
|---|---|
| `GET /v3.1/all?fields=...` | Load all countries |
| `GET /v3.1/alpha/:cca3?fields=...` | Country detail (via resolver) |
