import { devOnlyGuardedExpression } from '@angular/compiler';
import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

  public countries: Country[] | null = [];

  constructor(private countriesService: CountriesService){}

  searchByCapital(term: string): void {
    this.countriesService.searchByTerm( 'capital', term ).subscribe(

      countries => {
        this.countries = countries;
      }
    );

  }

}
