import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  Observable,
  BehaviorSubject
} from 'rxjs';
import {
  Menu
} from './menu-model';
import {
  environment
} from 'src/environments/environment';
import {
  map,
  tap
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuDataService {
  private _menus$ = new BehaviorSubject < Menu[] > ([]);
  private _menus: Menu[];

  constructor(private http: HttpClient) {
    this.menus$.subscribe((menus: Menu[]) => {
      this._menus = menus;
      this._menus$.next(this._menus);
    });
  }

  get allMenus$(): Observable < Menu[] > {
    return this._menus$;
  }

  get menus$(): Observable < Menu[] > {
    return this.http.get(`${environment.apiUrl}/Menu`).pipe(
      tap(console.log),
      map((list: any[]): Menu[] => list.map(Menu.fromJSON))
    );
  }

  deleteMenu(menu: Menu) {
    console.log(menu.id)
    this.http.delete(`${environment.apiUrl}/Menu/${menu.id}`).subscribe(() => {
      console.log(this._menus)
      this._menus = this._menus.filter((men) => men.id != menu.id);
      console.log(this._menus)
      this._menus$.next(this._menus);
    })
  }
}
