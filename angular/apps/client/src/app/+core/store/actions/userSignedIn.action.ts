import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import {
  BaseAction,
  generateActionType,
  setStateProperties,
} from '../../../+shared/helpers/state.helper';
import { User } from '../../../../../../../../+shared/types/user.interface';
import { ProtectedInitAction } from '../../../protected/+store/actions/init.action';
import { CoreState } from '../core.state';
import { FEATURE_NAME } from '../module';
import { AuthState } from '../types/authState.enum';
import { AuthSetStateAction } from './authSetState.action';

const type = generateActionType(FEATURE_NAME, 'User signed in');

export class UserSignedInAction implements BaseAction<CoreState> {
  feature = FEATURE_NAME;
  type = type;

  constructor(public payload: User) {}

  handler(state: CoreState, action: this): CoreState {
    return setStateProperties(state, { user: action.payload });
  }
}

@Injectable()
export class UserSignedInActionEffect {
  @Effect()
  authSetState$ = this.actions$
    .ofType(type)
    .pipe(map(() => new AuthSetStateAction(AuthState.authenticated)));

  @Effect()
  notifyProtectedModule$ = this.actions$
    .ofType(type)
    .pipe(map(() => new ProtectedInitAction()));

  constructor(private actions$: Actions) {}
}
