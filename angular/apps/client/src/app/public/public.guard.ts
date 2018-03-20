import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {AppState} from '../+core/store/app.state';
import {isAuthenticated} from '../+core/store/selectors';


@Injectable()
export class PublicGuard implements CanActivate {
  constructor(private store: Store<AppState>,
              private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.pipe(
      select(isAuthenticated),
      map(isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      })
    );
  }
}
