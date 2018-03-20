import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {Actions, Effect} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AngularFirestore} from 'angularfire2/firestore';
import {first, tap, withLatestFrom} from 'rxjs/operators';
import {FEATURE_NAME} from '../../../+store/module';
import {getActiveGroup} from '../../../+store/selectors';
import {ProtectedState} from '../../../+store/state';
import {AppState} from '../../../../+core/store/app.state';
import {getUser} from '../../../../+core/store/selectors';
import {BaseAction, generateActionType} from '../../../../+shared/helpers/state.helper';
import {Expense} from '../../../../../../../../../+shared/types/expense.interface';


const type = generateActionType(FEATURE_NAME, 'Expenses - create');

export class ExpensesCreateAction implements BaseAction<ProtectedState> {
  feature = FEATURE_NAME;
  type = type;

  constructor(public payload: Expense) {
  }

  handler(state: ProtectedState, action: this): ProtectedState {
    return state;
  }
}

@Injectable()
export class ExpensesCreateActionEffect {

  @Effect({dispatch: false}) save$ = this.actions$
    .ofType(type)
    .pipe(
      withLatestFrom(this.store),
      tap(([action, state]: [ExpensesCreateAction, AppState]) => {
        const user = getUser(state);
        const activeGroup = getActiveGroup(state);

        const expense = action.payload;
        expense.currency = this.db.doc(`currencies/${expense.currency}`).ref;
        expense.category = this.db.doc(`groups/${activeGroup.id}/categories/${expense.category}`).ref;
        expense.createdBy = this.db.doc(`users/${user.id}`).ref;
        expense.createdAt = new Date();
        this.db.collection<Expense>(`groups/${activeGroup.id}/expenses`).add(expense)
          .catch(error => {
            this.snackBar.open(`Expense wasn't saved to the server. Error`, undefined, {duration: 2500});
            console.error('Error adding expense: ', error);
          });
        // We do success actions in sync way, rather then call them in ".then()" method, because ".then()"
        // is called only for success write to the server, not to local storage
        this.snackBar.open(`Expense created`, 'SHOW', {duration: 2500})
          .onAction()
          .pipe(first())
          .subscribe(() => this.router.navigate(['/expenses/logs']));
        this.router.navigate(['/expenses']);
      }),
    );

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private db: AngularFirestore,
              private router: Router,
              private snackBar: MatSnackBar) {
  }
}

