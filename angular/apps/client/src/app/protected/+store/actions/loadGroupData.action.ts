import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AngularFirestore } from 'angularfire2/firestore';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { of } from 'rxjs/observable/of';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { FEATURE_NAME } from '../module';
import { getGroups } from '../selectors';
import { ProtectedState } from '../state';
import { AppState } from '../../../+core/store/app.state';
import { getUser } from '../../../+core/store/selectors';
import {
  unwrapCollectionSnapshotChanges,
  unwrapDocSnapshotChanges,
} from '../../../+shared/helpers/firestore.helper';
import {
  BaseAction,
  generateActionType,
} from '../../../+shared/helpers/state.helper';
import { Category } from '../../../../../../../../+shared/types/category.interface';
import { Expense } from '../../../../../../../../+shared/types/expense.interface';
import { Group } from '../../../../../../../../+shared/types/group.interface';
import { Tag } from '../../../../../../../../+shared/types/tag.interface';
import { User } from '../../../../../../../../+shared/types/user.interface';
import { CategoriesSetCollectionAction } from '../../categories/+store/actions/setCollection.action';
import { ExpensesSetCollectionAction } from '../../expenses/+store/actions/setCollection.action';
import { TagsSetCollectionAction } from '../../tags/+store/actions/setCollection.action';
import { UsersSetCollectionAction } from './usersSetCollection.action';

const type = generateActionType(FEATURE_NAME, 'Load group data');

export class LoadGroupDataAction implements BaseAction<ProtectedState> {
  feature = FEATURE_NAME;
  type = type;

  handler(state: ProtectedState, action: this): ProtectedState {
    return state;
  }
}

@Injectable()
export class LoadGroupDataActionEffect {
  @Effect()
  watchCategories$ = this.actions$.ofType(type).pipe(
    withLatestFrom(this.store),
    switchMap(([action, state]: [LoadGroupDataAction, AppState]) => {
      const user = getUser(state);
      const groups = getGroups(state);
      if (user && groups && groups.length) {
        const observables = groups.reduce((acc, group) => {
          const obs = this.db
            .collection<Group>(`groups/${group.id}/categories`)
            .snapshotChanges()
            .pipe(
              map(unwrapCollectionSnapshotChanges),
              map(items => ({ [group.id]: items })),
            );
          return [...acc, obs];
        }, []);
        return combineLatest(...observables);
      }
      return of(null);
    }),
    filter(v => !!v),
    map(itemsArrays =>
      itemsArrays.reduce((acc, cur) => ({ ...acc, ...cur }), {}),
    ),
    map(
      (items: { [key: string]: Category[] }) =>
        new CategoriesSetCollectionAction(items),
    ),
  );

  @Effect()
  watchExpenses$ = this.actions$.ofType(type).pipe(
    withLatestFrom(this.store),
    switchMap(([action, state]: [LoadGroupDataAction, AppState]) => {
      const user = getUser(state);
      const groups = getGroups(state);
      if (user && groups && groups.length) {
        const observables = groups.reduce((acc, group) => {
          const obs = this.db
            .collection<Expense>(`groups/${group.id}/expenses`)
            .snapshotChanges()
            .pipe(
              map(unwrapCollectionSnapshotChanges),
              map(items => ({ [group.id]: items })),
            );
          return [...acc, obs];
        }, []);
        return combineLatest(...observables);
      }
      return of(null);
    }),
    filter(v => !!v),
    map(itemsArrays =>
      itemsArrays.reduce((acc, cur) => ({ ...acc, ...cur }), {}),
    ),
    map(
      (items: { [key: string]: Expense[] }) =>
        new ExpensesSetCollectionAction(items),
    ),
  );

  @Effect()
  watchTags$ = this.actions$.ofType(type).pipe(
    withLatestFrom(this.store),
    switchMap(([action, state]: [LoadGroupDataAction, AppState]) => {
      const user = getUser(state);
      const groups = getGroups(state);
      if (user && groups && groups.length) {
        const observables = groups.reduce((acc, group) => {
          const obs = this.db
            .collection<Tag>(`groups/${group.id}/tags`)
            .snapshotChanges()
            .pipe(
              map(unwrapCollectionSnapshotChanges),
              map(items => ({ [group.id]: items })),
            );
          return [...acc, obs];
        }, []);
        return combineLatest(...observables);
      }
      return of(null);
    }),
    filter(v => !!v),
    map(itemsArrays =>
      itemsArrays.reduce((acc, cur) => ({ ...acc, ...cur }), {}),
    ),
    map(
      (items: { [key: string]: Tag[] }) => new TagsSetCollectionAction(items),
    ),
  );

  @Effect()
  watchUsers$ = this.actions$.ofType(type).pipe(
    withLatestFrom(this.store),
    switchMap(([action, state]: [LoadGroupDataAction, AppState]) => {
      const user = getUser(state);
      const groups = getGroups(state);
      if (user && groups && groups.length) {
        const userIds = groups.reduce((acc, group) => {
          Object.keys(group.roles).forEach(userId => {
            if (acc.indexOf(userId) === -1) {
              acc.push(userId);
            }
          });
          return acc;
        }, []);
        const observables = userIds.map(userId =>
          this.db
            .doc<User>(`users/${userId}`)
            .snapshotChanges()
            .pipe(map(unwrapDocSnapshotChanges)),
        );
        return combineLatest(...observables);
      }
      return of(null);
    }),
    filter(v => !!v),
    map((items: User[]) => new UsersSetCollectionAction(items)),
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private db: AngularFirestore,
  ) {}
}
