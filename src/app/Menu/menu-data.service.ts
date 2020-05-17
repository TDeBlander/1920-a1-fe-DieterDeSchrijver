import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import {
  Observable,
  BehaviorSubject,
  throwError
} from 'rxjs';
import {
  Menu
} from './menu-model';
import {
  environment
} from 'src/environments/environment';
import {
  map,
  tap,
  catchError
} from 'rxjs/operators';
import {
  Allergy
} from './allergy-model';

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

  public Menu$(id: string): Observable < Menu > {
    return this.http.get(`${environment.apiUrl}/Menu/${id}`).pipe(
      tap(console.log)
    )
  }

  get allMenus$(): Observable < Menu[] > {
    return this._menus$;
  }

  get menus$(): Observable < Menu[] > {
    return this.http.get(`${environment.apiUrl}/Menu`).pipe(
      map((list: any[]): Menu[] => list.map(Menu.fromJSON))
    );
  }

  deleteMenu(menu: Menu) {
    console.log(menu.id)
    this.http.delete(`${environment.apiUrl}/Menu/${menu.id}`).subscribe(() => {
      this._menus = this._menus.filter((men) => men.id != menu.id);
      this._menus$.next(this._menus);
    })
  }

  get allergies$(): Observable < Allergy[] > {
    return this.http.get(`${environment.apiUrl}/allergies`).pipe(
      map((list: any[]): Allergy[] => list.map(Allergy.fromJSON))
    )
  }

  addMenu(menu: Menu) {
    return this.http.post(`${environment.apiUrl}/menu/`, menu.toJSON())
      .pipe(catchError(this.handleError), map(Menu.fromJSON))
      .pipe(
        catchError((err) => {
          this._menus$.error(err);
          return throwError(err);
        }),
        tap((menu: Menu) => {
          this._menus = [...this._menus, menu];
          this._menus$.next(this._menus);
        })
      );
  }

  updateMenu(menu: Menu) {
    return this.http.put(`${environment.apiUrl}/menu/${menu.id}`, menu.toJSON())
      .pipe(catchError(this.handleError), map(Menu.fromJSON))
      .pipe(
        catchError((err) => {
          this._menus$.error(err);
          return throwError(err);
        }),
        tap((menu: Menu) => {
          this._menus = this._menus.filter((men) => men.id != menu.id);
          this._menus = [...this._menus, menu];
          this._menus$.next(this._menus);
        })
      );
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
