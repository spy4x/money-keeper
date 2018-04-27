import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FEATURE_NAME } from '@client/+core/store/module';
import { Actions, Effect } from '@ngrx/effects';
import { User } from '@root/+shared/types/user.interface';
import { AngularFirestore } from 'angularfire2/firestore';
import { tap } from 'rxjs/operators';
import {
  BaseAction,
  generateActionType,
} from '@client/+shared/helpers/state.helper';
import { CoreState } from '@client/+core/store/core.state';

const type = generateActionType(FEATURE_NAME, 'Profile - Update');

export class ProfileUpdateAction implements BaseAction<CoreState> {
  feature = FEATURE_NAME;
  type = type;

  constructor(public payload: User) {}

  handler(state: CoreState, action: this): CoreState {
    return state;
  }
}

@Injectable()
export class ProfileUpdateActionEffect {
  @Effect({ dispatch: false })
  save$ = this.actions$.ofType(type).pipe(
    tap((action: ProfileUpdateAction) => {
      const user = action.payload;

      this.db
        .doc<User>(`users/${user.id}`)
        .update(user)
        .catch(error => {
          this.snackBar.open(
            `Profile wasn't saved to the server. Error`,
            undefined,
            { duration: 2500 },
          );
          console.error('Error updating user profile: ', error);
        });
      // We do success actions in sync way, rather then call them in ".then()" method, because ".then()"
      // is called only for success write to the server, not to local storage
      this.snackBar.open(`Profile was updated`, '', { duration: 2500 });
    }),
  );

  constructor(
    private actions$: Actions,
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
  ) {}
}
