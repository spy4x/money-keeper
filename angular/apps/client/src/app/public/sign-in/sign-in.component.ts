import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
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

  constructor(private router: Router, private afAuth: AngularFireAuth) {
  }

  signIn(): void {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(() => this.router.navigate(['/']))
      .catch(console.error);
  }
}
