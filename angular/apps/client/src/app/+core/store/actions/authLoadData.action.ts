import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from 'firebase/app';
import { of } from 'rxjs/observable/of';
import {
  filter,
  first,
  map,
  skip,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { unwrapDocSnapshotChanges } from '../../../+shared/helpers/firestore.helper';
import {
  BaseAction,
  generateActionType,
} from '../../../+shared/helpers/state.helper';
import { AppState } from '../app.state';
import { CoreState } from '../core.state';
import { FEATURE_NAME } from '../module';
import { isAuthenticated } from '../selectors';
import { UserConfigUpdatedAction } from './userConfigUpdated.action';
import { UserSignedInAction } from './userSignedIn.action';
import { UserSignedOutAction } from './userSignedOut.action';
import { UserUpdatedAction } from './userUpdated.action';

const type = generateActionType(FEATURE_NAME, 'Auth - Load data');

export class AuthLoadDataAction implements BaseAction<CoreState> {
  feature = FEATURE_NAME;
  type = type;

  constructor(public payload: User) {}

  handler(state: CoreState, action: this): CoreState {
    return state;
  }
}

@Injectable()
export class AuthLoadDataActionEffect {
  @Effect()
  updateUserConfig$ = this.actions$.ofType(type).pipe(
    switchMap((action: AuthLoadDataAction) => {
      if (action.payload) {
        return this.db
          .doc(`usersConfigs/${action.payload.uid}`)
          .snapshotChanges()
          .pipe(filter(v => !!v), map(unwrapDocSnapshotChanges));
      }
      return of(null);
    }),
    filter(v => !!v),
    map(userConfig => new UserConfigUpdatedAction(userConfig)),
  );

  @Effect()
  loadUserDoc$ = this.actions$.ofType(type).pipe(
    withLatestFrom(this.store),
    switchMap(([action, state]: [AuthLoadDataAction, AppState]) => {
      if (action.payload) {
        return this.db
          .doc(`users/${action.payload.uid}`)
          .snapshotChanges()
          .pipe(
            filter(v => !!v),
            first(),
            map(unwrapDocSnapshotChanges),
            map((user: any) => new UserSignedInAction(user)),
          );
      } else {
        if (isAuthenticated(state)) {
          return of(new UserSignedOutAction());
        } else {
          return of(null);
        }
      }
    }),
    filter(v => !!v),
  );

  @Effect()
  updateUser$ = this.actions$.ofType(type).pipe(
    switchMap((action: AuthLoadDataAction) => {
      if (action.payload) {
        return this.db
          .doc(`users/${action.payload.uid}`)
          .snapshotChanges()
          .pipe(filter(v => !!v), skip(1), map(unwrapDocSnapshotChanges));
      }
      return of(null);
    }),
    filter(v => !!v),
    map((user: any) => new UserUpdatedAction(user)),
  );

  constructor(
    private actions$: Actions,
    private db: AngularFirestore,
    private store: Store<AppState>,
  ) {}
}
