import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({providedIn: 'root'})
export class CountriesService {

  constructor(private http: HttpClient) { }

  searchByTerm(typeOfSearch: string, term: string ): Observable<Country[] | null>{
    const url = `${ API_URL }/${ typeOfSearch }/${ term }`;

    return this.http.get<Country[]>(url)
    .pipe(
      catchError( error => {
        console.log( error );
        return of(null);
      })
    )
    }

}
