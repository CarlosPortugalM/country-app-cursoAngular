import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({providedIn: 'root'})
export class CountriesService {

  public cacheStore: CacheStore = {
    byCapital:  { term: '', countries:[] },
    byCountry:  { term: '', countries:[] },
    byRegion:   { region: '', countries:[] }
  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }



  searchByTerm(typeOfSearch: string, term: string ): Observable<Country[] | null>{
    const url = `${ API_URL }/${ typeOfSearch }/${ term }`;

    return this.http.get<Country[]>(url)
    .pipe(
      tap(countries => this.loadSavedStore(typeOfSearch,term, countries)),
      tap(() => this.saveToLocalStorage()),
      catchError( error => {
        console.log( error );
        return of(null)
      }),
      delay(1000)
    )
    }

    public loadSavedStore(typeOfSearch: string, term: string, countries: Country[]){
      switch(typeOfSearch){
        case 'capital':
            this.cacheStore.byCapital = { term, countries }
          break;

        case 'name':
          this.cacheStore.byCountry = { term, countries }
          break;

        case 'region':
          this.cacheStore.byRegion = {region: term, countries}
      }
    }

    private saveToLocalStorage() {
      localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
    }

    private loadFromLocalStorage() {
      if(!localStorage.getItem('cacheStore')) return;

      this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
    }
}
