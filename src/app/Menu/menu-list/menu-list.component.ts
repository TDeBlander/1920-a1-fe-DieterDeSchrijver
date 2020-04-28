import { Component, OnInit } from '@angular/core';
import { MenuDataService } from '../menu-data.service';
import { Observable, EMPTY } from 'rxjs';
import { Menu } from '../menu-model';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  private _fetchMenus$: Observable<Menu[]>;
  public errorMessage: string = '';

  constructor(private menuDataService: MenuDataService) { 
    
  }

  get menus$(){
    return this._fetchMenus$;
  }

  ngOnInit(): void {
    this._fetchMenus$ = this.menuDataService.allMenus$.pipe(
      catchError((err) => {
        this.errorMessage = err;
        return EMPTY;
      })
    );
  }

}
