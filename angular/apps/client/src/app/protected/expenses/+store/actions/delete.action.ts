import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {Actions, Effect} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AngularFirestore} from 'angularfire2/firestore';
import {timer} from 'rxjs/observable/timer';
import {tap, withLatestFrom} from 'rxjs/operators';
import {FEATURE_NAME} from '../../../+store/module';
import {getActiveGroup} from '../../../+store/selectors';
import {ProtectedState} from '../../../+store/state';
import {AppState} from '../../../../+core/store/app.state';
import {BaseAction, generateActionType} from '../../../../+shared/helpers/state.helper';
import {Expense} from '../../../../../../../../../+shared/types/expense.interface';
import {getCurrenciesItems} from '../selectors';


const type = generateActionType(FEATURE_NAME, 'Expenses - delete');

export class ExpensesDeleteAction implements BaseAction<ProtectedState> {
  feature = FEATURE_NAME;
  type = type;

  constructor(public payload: Expense) {
  }

  handler(state: ProtectedState, action: this): ProtectedState {
    return state;
  }
}

@Injectable()
export class ExpensesDeleteActionEffect {

  @Effect({dispatch: false}) delete$ = this.actions$
    .ofType(type)
    .pipe(
      withLatestFrom(this.store),
      tap(([action, state]: [ExpensesDeleteAction, AppState]) => {
        const activeGroup = getActiveGroup(state);
        const expense = action.payload;
        const symbol = getCurrenciesItems(state)[expense.currency.id || (expense.currency as any)].symbol;
        const snackBarRef = this.snackBar
          .open(
            `Expense ${expense.value}${symbol} will be deleted in a moment`,
            'CANCEL',
            {duration: 3500}
          );
        this.location.back();

        const deleteSub = timer(3500).subscribe(() =>
          this.db
            .doc<Expense>(`groups/${activeGroup.id}/expenses/${expense.id}`)
            .delete()
            .catch(error => {
              this.snackBar.open(`Expense wasn't deleted on the server. Error`, undefined, {duration: 2500});
              console.error('Error deleting expense: ', error);
            })
        );

        const subAction = snackBarRef
          .onAction()
          .subscribe(() => {
            deleteSub.unsubscribe();
          });
        setTimeout(() => {
          subAction.unsubscribe();
          deleteSub.unsubscribe();
        }, 3550); // this prevents next snackBar from not being opened
      }),
    );

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private db: AngularFirestore,
              private location: Location,
              private snackBar: MatSnackBar) {
  }
}

