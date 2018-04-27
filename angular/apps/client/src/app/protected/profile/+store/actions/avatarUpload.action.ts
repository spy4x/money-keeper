import { Injectable } from '@angular/core';
import { AppState } from '@client/+core/store/app.state';
import { getUser } from '@client/+core/store/selectors';
import {
  BaseAction,
  generateActionType,
  setStateProperties,
} from '@client/+shared/helpers/state.helper';
import { FEATURE_NAME } from '@client/protected/+store/module';
import { ProtectedState } from '@client/protected/+store/state';
import { ProfileAvatarUploadProgressAction } from '@client/protected/profile/+store/actions/avatarUploadProgress.action';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AngularFireStorage } from 'angularfire2/storage';
import { map, withLatestFrom } from 'rxjs/operators';

const type = generateActionType(FEATURE_NAME, 'Profile - Avatar upload');

export class ProfileAvatarUploadAction implements BaseAction<ProtectedState> {
  feature = FEATURE_NAME;
  type = type;

  constructor(public payload: File) {}

  handler(state: ProtectedState, action: this): ProtectedState {
    const profile = setStateProperties(state.profile, {
      isAvatarUploadInProgress: true,
    });
    return setStateProperties(state, { profile });
  }
}

@Injectable()
export class ProfileAvatarUploadActionEffect {
  @Effect()
  save$ = this.actions$.ofType(type).pipe(
    withLatestFrom(this.store),
    map(([action, state]: [ProfileAvatarUploadAction, AppState]) => {
      const user = getUser(state);
      const filePath = `users/${user.id}/avatar.jpg`;
      const task = this.storage.upload(filePath, action.payload);
      return new ProfileAvatarUploadProgressAction(task);
    }),
  );

  constructor(
    private actions$: Actions,
    private storage: AngularFireStorage,
    private store: Store<AppState>,
  ) {}
}
