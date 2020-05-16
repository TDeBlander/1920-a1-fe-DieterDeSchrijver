import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

function parseJwt(token) {
  if (!token) {
    return null;
  }
  const base64Token = token.split('.')[1];
  const base64 = base64Token.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly _tokenKey = 'currentAdmin';
  private _admin$: BehaviorSubject<string>;

  constructor(private http: HttpClient) {
    let parsedToken = parseJwt(localStorage.getItem(this._tokenKey));
    if (parsedToken) {
      const expires = new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date();
      if (expires) {
        localStorage.removeItem(this._tokenKey);
        parsedToken = null;
      }
    }
    this._admin$ = new BehaviorSubject<string>(parsedToken && parsedToken.unique_name);
  }

  get admin$(): BehaviorSubject<string> {
    return this._admin$;
  }

  get token(): string {
    const localToken = localStorage.getItem(this._tokenKey);
    return !!localToken ? localToken : '';
  }
  
  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post(
        `${environment.apiUrl}/login`,
        { email, password },
        { responseType: 'text' }
      )
      .pipe(
        map((token: any) => {
          if (token) {
            console.log(token)
            localStorage.setItem(this._tokenKey, token);
            this._admin$.next(email);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  logout() {
    if (this.admin$.getValue()) {
      localStorage.removeItem('currentAdmin');
      this._admin$.next(null);
    }
  }
}
