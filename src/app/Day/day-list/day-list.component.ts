import { Component, OnInit } from '@angular/core';
import { DayDataService } from '../day-data.service';
import { Day } from '../day-model';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-day-list',
  templateUrl: './day-list.component.html',
  styleUrls: ['./day-list.component.css']
})
export class DayListComponent implements OnInit {
  private _fetchDays$: Observable<Day[]>;
  errorMessage: any;

  constructor(private dayDataService: DayDataService) { }

  ngOnInit(): void {
    this._fetchDays$ = this.dayDataService.days$.pipe(
      catchError((err) => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

    console.log(this._fetchDays$)
  }

  get days$(){
    return this._fetchDays$;
  }

}
