import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore} from 'angularfire2/firestore';
import {AuthSetStateAction} from '../store/actions/authSetState.action';
import {AppState} from '../store/app.state';


@Injectable()
export class UserService {

  constructor(private afAuth: AngularFireAuth,
              private store: Store<AppState>,
              private db: AngularFirestore) {
  }

  init() {
    this.afAuth.authState.subscribe(user => {
      this.store.dispatch(new AuthSetStateAction(user));
    });
  }

}
