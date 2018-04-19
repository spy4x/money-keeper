import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AngularFirestore } from 'angularfire2/firestore';
import { first, tap, withLatestFrom } from 'rxjs/operators';
import { FEATURE_NAME } from '../../../+store/module';
import { getActiveGroup } from '../../../+store/selectors';
import { ProtectedState } from '../../../+store/state';
import { AppState } from '../../../../+core/store/app.state';
import {
  BaseAction,
  generateActionType,
} from '../../../../+shared/helpers/state.helper';
import { Expense } from '../../../../../../../../../+shared/types/expense.interface';
import { getCurrenciesItems } from '../selectors';

const type = generateActionType(FEATURE_NAME, 'Expenses - edit');

export class ExpensesEditAction implements BaseAction<ProtectedState> {
  feature = FEATURE_NAME;
  type = type;

  constructor(public payload: Expense) {}

  handler(state: ProtectedState, action: this): ProtectedState {
    return state;
  }
}

@Injectable()
export class ExpensesEditActionEffect {
  @Effect({ dispatch: false })
  save$ = this.actions$.ofType(type).pipe(
    withLatestFrom(this.store),
    tap(([action, state]: [ExpensesEditAction, AppState]) => {
      const activeGroup = getActiveGroup(state);

      const expense = action.payload;
      const expenseId = expense.id;
      delete expense.id;
      expense.currency = this.db.doc(`currencies/${expense.currency}`).ref;
      expense.category = this.db.doc(
        `groups/${activeGroup.id}/categories/${expense.category}`,
      ).ref;
      expense.createdBy = this.db.doc(`users/${expense.createdBy}`).ref;

      this.db
        .doc<Expense>(`groups/${activeGroup.id}/expenses/${expenseId}`)
        .update(expense)
        .catch(error => {
          this.snackBar.open(
            `Expense wasn't saved to the server. Error`,
            undefined,
            { duration: 2500 },
          );
          console.error('Error editing expense: ', error);
        });
      // We do success actions in sync way, rather then call them in ".then()" method, because ".then()"
      // is called only for success write to the server, not to local storage
      const sub = this.snackBar
        .open(
          `Expense ${expense.value}${
            getCurrenciesItems(state)[expense.currency.id].symbol
          } saved`,
          'SHOW',
          { duration: 2500 },
        )
        .onAction()
        .pipe(first())
        .subscribe(() => this.router.navigate(['/expenses']));
      setTimeout(() => sub.unsubscribe(), 2500); // this prevents next snackBar from not being opened
      this.location.back();
    }),
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private db: AngularFirestore,
    private router: Router,
    private location: Location,
    private snackBar: MatSnackBar,
  ) {}
}
