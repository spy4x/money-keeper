import {BaseAction, generateActionType, setStateProperties} from '../../../+shared/helpers/state.helper';
import {FEATURE_NAME} from '../module';
import {CoreState} from '../core.state';
import {Router} from '@angular/router';
import {Actions, Effect} from '@ngrx/effects';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';


const type = generateActionType(FEATURE_NAME, 'User signed out');

export class UserSignedOutAction implements BaseAction<CoreState> {
  feature = FEATURE_NAME;
  type = type;


  handler(state: CoreState, action: this): CoreState {
    return setStateProperties(state, {user: null, userConfig: null});
  }
}

@Injectable()
export class UserSignedOutActionEffect {

  @Effect({dispatch: false}) redirect$ = this.actions$
    .ofType(type)
    .pipe(
      tap(() => this.router.navigate(['/public']))
    );

  @Effect({dispatch: false}) showSnackBar$ = this.actions$
    .ofType(type)
    .pipe(
      tap(() =>
        this.snackBar.open(`See you soon!`, undefined, {duration: 2500}))
    );

  constructor(private actions$: Actions,
              private router: Router,
              private snackBar: MatSnackBar) {
  }
}
