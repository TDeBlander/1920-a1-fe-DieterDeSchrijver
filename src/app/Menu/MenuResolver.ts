import { Menu } from './menu-model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { MenuDataService } from './menu-data.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class MenuResolver implements Resolve<Menu> {
    constructor(private menuDataService: MenuDataService) {}
 
  resolve(route: ActivatedRouteSnapshot, 
          state: RouterStateSnapshot): Observable<Menu> {
    return this.menuDataService.Menu$(route.params['id']);
  }
  }