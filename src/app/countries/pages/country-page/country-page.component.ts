import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent implements OnInit{

  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
    ) {}



  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this.countriesService.searchByTerm( 'alpha', id ))
    )
      .subscribe( (response ) => {
        if(response === null) {
          this.router.navigateByUrl('');
        }else if(response.length > 0) {
          this.country = response[0];
        }

        return;
      });
  }
}