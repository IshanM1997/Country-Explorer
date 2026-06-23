import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreGuard } from './explore.guard';
import { CountryDetailResolver } from './country-detail.resolver';
import { CountryListComponent } from './country-list.component';
import { CountryDetailComponent } from './country-detail.component';
import { NotFoundComponent } from './not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'countries', pathMatch: 'full' },
  {
    path: 'countries',
    component: CountryListComponent,
    canActivate: [ExploreGuard]
  },
  {
    path: 'countries/:code',
    component: CountryDetailComponent,
    canActivate: [ExploreGuard],
    resolve: { country: CountryDetailResolver }
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
