import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from './hero.model';
import { Observable } from 'rxjs';
import { BaseUrl } from '../shared/api.config';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${BaseUrl.hero}`);
  }

  getHero(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${BaseUrl.hero}${id}`);
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${BaseUrl.hero}`, hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${BaseUrl.hero}${hero.id}`, hero);
  }

  removeHero(id: string): Observable<Hero> {
    return this.http.delete<Hero>(`${BaseUrl.hero}${id}`);
  }
}
