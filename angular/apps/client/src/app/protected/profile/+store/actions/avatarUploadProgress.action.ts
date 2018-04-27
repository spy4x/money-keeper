import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AppState } from '@client/+core/store/app.state';
import { getUser } from '@client/+core/store/selectors';
import {
  BaseAction,
  generateActionType,
  setStateProperties,
} from '@client/+shared/helpers/state.helper';
import { FEATURE_NAME } from '@client/protected/+store/module';
import { ProtectedState } from '@client/protected/+store/state';
import { ProfileAvatarUploadFailedAction } from '@client/protected/profile/+store/actions/avatarUploadFailed.action';
import { ProfileAvatarUploadSuccessfulAction } from '@client/protected/profile/+store/actions/avatarUploadSuccessful.action';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireUploadTask } from 'angularfire2/storage';
import { of } from 'rxjs/observable/of';
import {
  catchError,
  first,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';

const type = generateActionType(
  FEATURE_NAME,
  'Profile - Avatar upload - Progress',
);

export class ProfileAvatarUploadProgressAction
  implements BaseAction<ProtectedState> {
  feature = FEATURE_NAME;
  type = type;

  constructor(public payload: AngularFireUploadTask) {}

  handler(state: ProtectedState, action: this): ProtectedState {
    const profile = setStateProperties(state.profile, {
      uploadProgress$: action.payload.percentageChanges(),
    });
    return setStateProperties(state, { profile });
  }
}

@Injectable()
export class ProfileAvatarUploadProgressActionEffect {
  @Effect()
  save$ = this.actions$.ofType(type).pipe(
    withLatestFrom(this.store),
    switchMap(
      ([action, state]: [ProfileAvatarUploadProgressAction, AppState]) => {
        const user = getUser(state);
        return action.payload.downloadURL().pipe(
          first(),
          map(photoURL => {
            this.db.doc(`users/${user.id}`).update({ photoURL });
            this.snackBar.open(
              `Avatar was uploaded. It will take few moments before it is updated.`,
              '',
              { duration: 3500 },
            );
            return new ProfileAvatarUploadSuccessfulAction();
          }),
          catchError(error => {
            this.snackBar.open(`Avatar upload was failed.`, '', {
              duration: 2500,
            });
            console.log('Avatar upload was failed - ', error);
            return of(new ProfileAvatarUploadFailedAction());
          }),
        );
      },
    ),
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
  ) {}
}
