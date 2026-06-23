import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, shareReplay, catchError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country, CountrySummary } from './country.model';

const BASE          = 'https://restcountries.com/v3.1';
const LIST_FIELDS   = 'cca3,cca2,name,flag,flags,capital,region,subregion,population,area,languages';
const DETAIL_FIELDS = 'cca3,cca2,name,flag,flags,capital,region,subregion,population,area,languages,currencies,borders,timezones,continents,tld,unMember,landlocked,maps,coatOfArms,idd,car,gini,fifa,startOfWeek,latlng,demonyms,altSpellings,independent,status,capitalInfo';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private allCache$:   Observable<CountrySummary[]> | null = null;
  private detailCache = new Map<string, Observable<Country>>();

  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<CountrySummary[]> {
    if (this.allCache$) return this.allCache$;
    const params = new HttpParams().set('fields', LIST_FIELDS);
    this.allCache$ = this.http
      .get<CountrySummary[]>(`${BASE}/all`, { params })
      .pipe(shareReplay(1), catchError(() => of([])));
    return this.allCache$;
  }

  getCountryByCode(cca3: string): Observable<Country> {
    const code = cca3.toUpperCase();
    if (this.detailCache.has(code)) return this.detailCache.get(code)!;

    const params = new HttpParams().set('fields', DETAIL_FIELDS);
    const req$ = this.http
      .get<Country[]>(`${BASE}/alpha/${code}`, { params })
      .pipe(
        map(arr => arr[0]),
        shareReplay(1),
        catchError(() => of(null as unknown as Country))
      );

    this.detailCache.set(code, req$);
    return req$;
  }
}
