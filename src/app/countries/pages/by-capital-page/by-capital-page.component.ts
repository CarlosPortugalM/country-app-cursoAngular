import { devOnlyGuardedExpression } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent implements OnInit{

  public countries: Country[] | null = [];
  public arg:string = 'país';
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(private countriesService: CountriesService){}

  ngOnInit(): void {
   this.countries = this.countriesService.cacheStore.byCapital.countries;
   this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }

  searchByCapital(term: string): void {
    this.isLoading = true;
    this.countriesService.searchByTerm( 'capital', term ).subscribe(

      countries => {
        this.countries = countries;
        this.isLoading = false;
      }
    );

  }

}
