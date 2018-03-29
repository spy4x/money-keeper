import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {Actions, Effect} from '@ngrx/effects';
import {map, tap} from 'rxjs/operators';
import {BaseAction, generateActionType, setStateProperties} from '../../../+shared/helpers/state.helper';
import {User} from '../../../../../../../../+shared/types/user.interface';
import {ProtectedInitAction} from '../../../protected/+store/actions/init.action';
import {CoreState} from '../core.state';
import {FEATURE_NAME} from '../module';


const type = generateActionType(FEATURE_NAME, 'User signed in');

export class UserSignedInAction implements BaseAction<CoreState> {
  feature = FEATURE_NAME;
  type = type;

  constructor(public payload: User) {
  }

  handler(state: CoreState, action: this): CoreState {
    return setStateProperties(state, {user: action.payload});
  }
}

@Injectable()
export class UserSignedInActionEffect {

  @Effect({dispatch: false}) showSnackBar$ = this.actions$
    .ofType(type)
    .pipe(
      tap((action: UserSignedInAction) =>
        this.snackBar.open(`Welcome ${action.payload.displayName}!`, undefined, {duration: 2500}))
    );

  @Effect() notifyProtectedModule$ = this.actions$
    .ofType(type)
    .pipe(
      map(() => new ProtectedInitAction())
    );

  constructor(private actions$: Actions,
              private snackBar: MatSnackBar,) {
  }
}
