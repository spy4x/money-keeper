import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { filter, first } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { AppState } from '../../+core/store/app.state';
import { isAuthenticated } from '../../+core/store/selectors';
import { AuthState } from '../../+core/store/types/authState.enum';

@Component({
  selector: 'mk-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnDestroy {
  sub = new Subscription();
  authState$ = this.store.pipe(select(s => s.core.authState));
  AuthState = AuthState;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private store: Store<AppState>,
  ) {
    this.sub.add(
      this.store
        .pipe(select(isAuthenticated), filter(v => !!v), first())
        .subscribe(() => this.router.navigate(['/'])),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  signIn(): void {
    this.afAuth.auth
      .signInWithRedirect(new firebase.auth.GoogleAuthProvider())
      .catch(console.error);
  }
}
