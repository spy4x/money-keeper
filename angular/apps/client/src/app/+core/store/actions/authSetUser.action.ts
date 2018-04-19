import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {User} from 'firebase/app';
import {filter, map} from 'rxjs/operators';
import {BaseAction, generateActionType} from '../../../+shared/helpers/state.helper';
import {CoreState} from '../core.state';
import {FEATURE_NAME} from '../module';
import {AuthState} from '../types/authState.enum';
import {AuthLoadDataAction} from './authLoadData.action';
import {AuthSetStateAction} from './authSetState.action';


const type = generateActionType(FEATURE_NAME, 'Auth - Set user');

export class AuthSetUserAction implements BaseAction<CoreState> {
  feature = FEATURE_NAME;
  type = type;

  constructor(public payload: User) {
  }

  handler(state: CoreState, action: this): CoreState {
    return state;
  }
}

@Injectable()
export class AuthSetUserActionEffect {

  @Effect() authSetState$ = this.actions$
    .ofType(type)
    .pipe(
      filter((action: AuthSetUserAction) => !!action.payload),
      map((action: AuthSetUserAction) =>
        new AuthSetStateAction(action.payload
          ? AuthState.loadingData
          : AuthState.notAuthenticated))
    );

  @Effect() authLoadData$ = this.actions$
    .ofType(type)
    .pipe(
      filter((action: AuthSetUserAction) => !!action.payload),
      map((action: AuthSetUserAction) => new AuthLoadDataAction(action.payload))
    );

  constructor(private actions$: Actions) {
  }
}
