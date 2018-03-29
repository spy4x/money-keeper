import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {Actions, Effect} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AngularFirestore} from 'angularfire2/firestore';
import {filter, map, tap, withLatestFrom} from 'rxjs/operators';
import {AppState} from '../../../+core/store/app.state';
import {getUser, getUserConfig} from '../../../+core/store/selectors';
import {BaseAction, generateActionType, setStateProperties} from '../../../+shared/helpers/state.helper';
import {FEATURE_NAME} from '../module';
import {getActiveGroup, getGroupItems} from '../selectors';
import {ProtectedState} from '../state';


const type = generateActionType(FEATURE_NAME, 'Groups - Set activeItemId');

export class GroupsSetActiveItemIdAction implements BaseAction<ProtectedState> {
  feature = FEATURE_NAME;
  type = type;

  constructor(public payload: { groupId: string, shouldNotify: boolean }) {
  }

  handler(state: ProtectedState, action: this): ProtectedState {
    return state
  }
}

@Injectable()
export class GroupsSetActiveItemIdActionEffect {

  @Effect({dispatch: false}) updateActiveGroupInUserConfigDoc$ = this.actions$
    .ofType(type)
    .pipe(
      withLatestFrom(this.store),
      map(([action, state]: [GroupsSetActiveItemIdAction, AppState]) => ({
        groupId: action.payload.groupId,
        userConfig: getUserConfig(state)
      })),
      filter(({groupId, userConfig}) => userConfig.activeGroupId !== groupId),
      tap(({groupId, userConfig}) => this.db.doc(`usersConfigs/${userConfig.id}`)
        .update({activeGroupId: groupId})
        .catch(error => console.error('updateActiveGroupInUserConfigDoc$', error)))
    );

  @Effect({dispatch: false}) loadGroupData$ = this.actions$
    .ofType(type)
    .pipe(
      withLatestFrom(this.store),
      map(([action, state]: [GroupsSetActiveItemIdAction, AppState]) => ({
        group: getGroupItems(state)[action.payload.groupId],
        shouldNotify: action.payload.shouldNotify
      })),
      filter(({shouldNotify}) => shouldNotify),
      tap(({group}) => this.snackBar.open(`Group is switched to "${group.isPersonal ? 'Personal expenses' : group.name}"`, undefined, {duration: 2500}))
    );

  constructor(private actions$: Actions,
              private db: AngularFirestore,
              private store: Store<AppState>,
              private snackBar: MatSnackBar) {
  }
}
