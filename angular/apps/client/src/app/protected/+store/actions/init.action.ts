import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AngularFirestore} from 'angularfire2/firestore';
import {of} from 'rxjs/observable/of';
import {filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {AppState} from '../../../+core/store/app.state';
import {unwrapCollectionSnapshotChanges} from '../../../+shared/helpers/firestore.helper';
import {BaseAction, generateActionType} from '../../../+shared/helpers/state.helper';
import {Group} from '../../../../../../../../+shared/types/group.interface';
import {FEATURE_NAME} from '../module';
import {ProtectedState} from '../state';
import {GroupsSetCollectionAction} from './groupsSetCollection.action';
import {Currency} from '../../../../../../../../+shared/types/currency.interface';
import {CurrenciesSetCollectionAction} from './currenciesSetCollection.action';


const type = generateActionType(FEATURE_NAME, 'Init');

export class ProtectedInitAction implements BaseAction<ProtectedState> {
  feature = FEATURE_NAME;
  type = type;


  handler(state: ProtectedState, action: this): ProtectedState {
    return state;
  }
}

@Injectable()
export class ProtectedInitActionEffect {

  @Effect() watchGroups$ = this.actions$
    .ofType(type)
    .pipe(
      withLatestFrom(this.store),
      switchMap(([action, state]: [ProtectedInitAction, AppState]) => {
        const user = state.core.user;
        if (user) {
          return this.db
            .collection<Group>('groups', ref => ref.where(`roles.${user.id}`, '>', ''))
            .snapshotChanges()
            .pipe(
              map(unwrapCollectionSnapshotChanges),
            );
        }
        return of(null);
      }),
      filter(v => !!v),
      map((groups: Group[]) => new GroupsSetCollectionAction(groups))
    );

  @Effect() watchCurrencies$ = this.actions$
    .ofType(type)
    .pipe(
      switchMap(() => {
          return this.db
            .collection<Currency>('currencies')
            .snapshotChanges()
            .pipe(
              map(unwrapCollectionSnapshotChanges),
            );
      }),
      map((items: Currency[]) => new CurrenciesSetCollectionAction(items))
    );

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private db: AngularFirestore) {
  }
}
