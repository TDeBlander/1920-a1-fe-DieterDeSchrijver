import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Day } from './day-model';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DayDataService {
  private _days$ = new BehaviorSubject < Day[] > ([]);
  private _days: Day[];
  private _selectedDays: string[];

  constructor(private http: HttpClient) {
    this.days$.subscribe((days: Day[]) => {
      this._days = days;
      this._days$.next(this._days);
    });
    this._selectedDays = []
   }

   get allDays$(): Observable < Day[] > {
    return this._days$;
  }

  get days$(): Observable < Day[] > {
    return this.http.get(`${environment.apiUrl}/Day`).pipe(
      tap(console.log),
      map((list: any[]): Day[] => list.map(Day.fromJSON))
    );
  }

  public Day$(id: string): Observable < Day > {
    return this.http.get(`${environment.apiUrl}/Day/${id}`).pipe(
      tap(console.log)
    )
  }

  addDay(day: any) {
    return this.http.post(`${environment.apiUrl}/day/`, day)
      .pipe(catchError(this.handleError), map(Day.fromJSON))
      .pipe(
        catchError((err) => {
          this._days$.error(err);
          return throwError(err);
        }),
        tap((day: Day) => {
          this._days = [...this._days, day];
          this._days$.next(this._days);
        })
      );
  }

  deleteDay(day: Day) {
    this.http.delete(`${environment.apiUrl}/Day/${day.id}`).subscribe(() => {
      this._days = this._days.filter((d) => d.id != day.id);
      this._days$.next(this._days);
    })
  }

  selectDay(id: string, select: boolean): void{
    if (select) {
      this._selectedDays = [...this._selectedDays, id]
    }else{
      this._selectedDays = this._selectedDays.filter((d) => d != id);
    }

    console.log(this._selectedDays)
  }

  handleError(err: any): Observable < never > {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else if (err instanceof HttpErrorResponse) {
      console.log(err);
      errorMessage = `'${err.status} ${err.statusText}' when accessing '${err.url}'`;
    } else {
      errorMessage = err;
    }
    return throwError(errorMessage);
  }
}
