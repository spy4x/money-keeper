import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {filter, first} from 'rxjs/operators';
import {AppState} from '../../+core/store/app.state';
import {isAuthenticated} from '../../+core/store/selectors';


@Component({
  selector: 'mk-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent {

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private store: Store<AppState>) {
  }

  signIn(): void {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(() => {
        const sub = this.store
          .pipe(
            select(isAuthenticated),
            filter(v => !!v),
            first()
          )
          .subscribe(() => {
            this.router.navigate(['/']);
            sub.unsubscribe();
          });

      })
      .catch(console.error);
  }
}
