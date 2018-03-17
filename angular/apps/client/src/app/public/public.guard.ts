import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import {map, tap} from 'rxjs/operators';


@Injectable()
export class PublicGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth,
              private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.afAuth.authState.pipe(
      map(userInfo => !userInfo),
      tap(isAuthenticated => !isAuthenticated && this.router.navigate(['/']))
    );
  }
}
