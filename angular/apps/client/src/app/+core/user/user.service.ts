import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AngularFireAuth} from 'angularfire2/auth';
import {filter} from 'rxjs/operators';
import {AuthSetUserAction} from '../store/actions/authSetUser.action';
import {AppState} from '../store/app.state';


@Injectable()
export class UserService {

  constructor(private afAuth: AngularFireAuth,
              private store: Store<AppState>) {
  }

  init() {
    this.afAuth.authState
      .pipe(filter(v => !!v))
      .subscribe(user => {
        this.store.dispatch(new AuthSetUserAction(user));
      });
  }

}
