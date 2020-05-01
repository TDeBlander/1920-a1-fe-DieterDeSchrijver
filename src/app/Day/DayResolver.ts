
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Day } from './day-model';
import { DayDataService } from './day-data.service';

@Injectable({
    providedIn: 'root'
  })
  export class DayResolver implements Resolve<Day> {
    constructor(private dayDataService: DayDataService) {}
 
  resolve(route: ActivatedRouteSnapshot, 
          state: RouterStateSnapshot): Observable<Day> {
    return this.dayDataService.Day$(route.params['id']);
  }
  }