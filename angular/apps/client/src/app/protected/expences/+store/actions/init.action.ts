import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AngularFirestore} from 'angularfire2/firestore';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {of} from 'rxjs/observable/of';
import {filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {FEATURE_NAME} from '../../../+store/module';
import {getGroups} from '../../../+store/selectors';
import {ProtectedState} from '../../../+store/state';
import {AppState} from '../../../../+core/store/app.state';
import {getUser} from '../../../../+core/store/selectors';
import {unwrapCollectionSnapshotChanges} from '../../../../+shared/helpers/firestore.helper';
import {BaseAction, generateActionType} from '../../../../+shared/helpers/state.helper';
import {Category} from '../../../../../../../../../+shared/types/category.interface';
import {Expense} from '../../../../../../../../../+shared/types/expense.interface';
import {Group} from '../../../../../../../../../+shared/types/group.interface';
import {CategoriesSetCollectionAction} from './setCategories.action';
import {ExpensesSetCollectionAction} from './expensesSetCollection.action';


const type = generateActionType(FEATURE_NAME, 'Expenses Init');

export class ExpensesInitAction implements BaseAction<ProtectedState> {
  feature = FEATURE_NAME;
  type = type;


  handler(state: ProtectedState, action: this): ProtectedState {
    return state;
  }
}

@Injectable()
export class ExpensesInitActionEffect {

  @Effect() watchCategories$ = this.actions$
    .ofType(type)
    .pipe(
      withLatestFrom(this.store),
      switchMap(([action, state]: [ExpensesInitAction, AppState]) => {
        const user = getUser(state);
        const groups = getGroups(state);
        if (user && groups && groups.length) {
          const observables = groups.reduce((acc, group) => {
            const obs = this.db
              .collection<Group>(`groups/${group.id}/categories`)
              .snapshotChanges()
              .pipe(
                map(unwrapCollectionSnapshotChanges),
                map(categories => ({[group.id]: categories}))
              );
            return [...acc, obs];
          }, []);
          return combineLatest(...observables);
        }
        return of(null);
      }),
      filter(v => !!v),
      map(categoriesArrays => categoriesArrays.reduce((acc, cur) => ({...acc, ...cur}), {})),
      map((categories: { [key: string]: Category[] }) => new CategoriesSetCollectionAction(categories))
    );

  @Effect() watchExpenses$ = this.actions$
    .ofType(type)
    .pipe(
      withLatestFrom(this.store),
      switchMap(([action, state]: [ExpensesInitAction, AppState]) => {
        const user = getUser(state);
        const groups = getGroups(state);
        if (user && groups && groups.length) {
          const observables = groups.reduce((acc, group) => {
            const obs = this.db
              .collection<Expense>(`groups/${group.id}/expenses`)
              .snapshotChanges()
              .pipe(
                map(unwrapCollectionSnapshotChanges),
                map(categories => ({[group.id]: categories}))
              );
            return [...acc, obs];
          }, []);
          return combineLatest(...observables);
        }
        return of(null);
      }),
      filter(v => !!v),
      map(expensesArrays => expensesArrays.reduce((acc, cur) => ({...acc, ...cur}), {})),
      map((expenses: { [key: string]: Expense[] }) => new ExpensesSetCollectionAction(expenses))
    );

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private db: AngularFirestore) {
  }
}
