import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryListComponent } from './country-list.component';
import { CountryDetailComponent } from './country-detail.component';
import { CountryCardComponent } from './country-card.component';
import { SearchBarComponent } from './search-bar.component';
import { RegionFilterComponent } from './region-filter.component';
import { NotFoundComponent } from './not-found.component';
import { PopulationPipe } from './population.pipe';
import { AreaPipe } from './area.pipe';
import { LoadingInterceptor } from './loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent,
    CountryDetailComponent,
    CountryCardComponent,
    SearchBarComponent,
    RegionFilterComponent,
    NotFoundComponent,
    PopulationPipe,
    AreaPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
