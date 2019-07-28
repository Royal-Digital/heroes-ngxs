import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Villain } from './villain.model';
import { Observable, throwError } from 'rxjs';
import { BaseUrl } from '../shared/api.config';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VillainService {
  constructor(private http: HttpClient) {}

  getVillains(): Observable<Villain[]> {
    return this.http.get<Villain[]>(`${BaseUrl.villain}`);
  }

  getVillain(id: string): Observable<Villain> {
    return this.http
      .get<Villain>(`${BaseUrl.villain}${id}`)
      .pipe(
        catchError((err: HttpErrorResponse) =>
          throwError(new Error(err.message))
        )
      );
  }

  addVillain(villain: Villain): Observable<Villain> {
    return this.http.post<Villain>(`${BaseUrl.villain}`, villain).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(new Error(err.message));
      })
    );
  }

  updateVillain(villain: Villain): Observable<Villain> {
    return this.http
      .put<Villain>(`${BaseUrl.villain}${villain.id}`, villain)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(new Error(err.message));
        })
      );
  }

  removeVillain(id: string): Observable<Villain> {
    return this.http.delete<Villain>(`${BaseUrl.villain}${id}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(new Error(err.message));
      })
    );
  }
}
