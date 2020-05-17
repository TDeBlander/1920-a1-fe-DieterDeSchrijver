import { Component, OnInit, Input } from '@angular/core';
import { DayDataService } from '../day-data.service';
import { Day } from '../day-model';
import { Observable, EMPTY } from 'rxjs';
import { map, tap, filter, catchError, mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-day-list',
  templateUrl: './day-list.component.html',
  styleUrls: ['./day-list.component.css']
})
export class DayListComponent implements OnInit {
  private _fetchDays$: Observable<Day[]>;
  errorMessage: any;
  @Input() public onHome: boolean;

  constructor(private dayDataService: DayDataService) { }

  ngOnInit(): void {
    this._fetchDays$ = this.dayDataService.days$.pipe(
      tap(console.log),
      map((list: any[]): Day[] => list.sort(this.sortByDate)),
      tap(console.log),
      catchError((err) => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

    console.log(this.onHome)
  }

  sortByDate(a, b){
    if (a.date < b.date)
    return -1;
  if (a.date > b.date)
    return 1;
  return 0;
  }

  get days$(){
    return this._fetchDays$;
  }

}
