import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  public countries: Country[] | null = [];

  constructor(private countriesService: CountriesService){}

  searchByRegion(term: string): void {
    this.countriesService.searchByTerm( 'region', term ).subscribe(

      countries => {
        this.countries = countries;
      }
    );

  }

}
