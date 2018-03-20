import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Component({
  selector: 'mk-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent {

  constructor(private afAuth: AngularFireAuth) {
  }

  signIn(): void {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .catch(console.error);
  }
}
