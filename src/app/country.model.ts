export interface CountryName {
  common: string;
  official: string;
  nativeName?: Record<string, { official: string; common: string }>;
}
export interface CountryFlags    { png: string; svg: string; alt?: string; }
export interface CountryMaps     { googleMaps: string; openStreetMaps: string; }
export interface CountryCurrency { name: string; symbol: string; }
export interface CountryCoatOfArms { png?: string; svg?: string; }

export interface Country {
  name:         CountryName;
  cca2:         string;
  cca3:         string;
  tld?:         string[];
  independent?: boolean;
  unMember:     boolean;
  currencies?:  Record<string, CountryCurrency>;
  idd?:         { root?: string; suffixes?: string[] };
  capital?:     string[];
  region:       string;
  subregion?:   string;
  languages?:   Record<string, string>;
  latlng:       [number, number];
  landlocked:   boolean;
  borders?:     string[];
  area:         number;
  demonyms?:    Record<string, { f: string; m: string }>;
  flag:         string;
  maps:         CountryMaps;
  population:   number;
  gini?:        Record<string, number>;
  fifa?:        string;
  car:          { signs: string[]; side: string };
  timezones:    string[];
  continents:   string[];
  flags:        CountryFlags;
  coatOfArms:   CountryCoatOfArms;
  startOfWeek:  string;
  altSpellings: string[];
  status:       string;
  capitalInfo:  { latlng?: [number, number] };
}

export interface CountrySummary {
  cca3:       string;
  cca2:       string;
  name:       CountryName;
  flag:       string;
  flags:      CountryFlags;
  capital?:   string[];
  region:     string;
  subregion?: string;
  population: number;
  area:       number;
  languages?: Record<string, string>;
}
