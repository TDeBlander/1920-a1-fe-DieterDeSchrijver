import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Day } from './day-model';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DayDataService {
  private _days$ = new BehaviorSubject < Day[] > ([]);
  private _days: Day[];

  constructor(private http: HttpClient) {
    this.days$.subscribe((days: Day[]) => {
      this._days = days;
      this._days$.next(this._days);
    });
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
}
