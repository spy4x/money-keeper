import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import {map, tap} from 'rxjs/operators';
import {ActiveGroupService} from './active-group.service';
import {ActiveUserService} from './active-user.service';


@Injectable()
export class ProtectedGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private activeGroupService: ActiveGroupService,
              private activeUserService: ActiveUserService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.afAuth.authState.pipe(
      tap(userInfo => {
        if (!userInfo) {
          this.router.navigate(['/public']);
        } else {
          this.activeGroupService.setPath(`/groups/${userInfo.uid}`);
          this.activeUserService.setPath(`/users/${userInfo.uid}`);
        }
      }),
      map(userInfo => !!userInfo),
    );
  }
}
