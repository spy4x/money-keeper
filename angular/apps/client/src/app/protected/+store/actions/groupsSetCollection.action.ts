import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../../../+core/store/app.state';
import { getUser, getUserConfig } from '../../../+core/store/selectors';
import {
  BaseAction,
  generateActionType,
  setStateProperties,
} from '../../../+shared/helpers/state.helper';
import { Group } from '../../../../../../../../+shared/types/group.interface';
import { User } from '../../../../../../../../+shared/types/user.interface';
import { FEATURE_NAME } from '../module';
import { ProtectedState } from '../state';
import { GroupsSetActiveItemIdAction } from './groupsSetActiveItemId.action';
import { LoadGroupDataAction } from './loadGroupData.action';
import { UserConfig } from '../../../../../../../../+shared/types/userConfig.interface';

const type = generateActionType(FEATURE_NAME, 'Set groups');

export class GroupsSetCollectionAction implements BaseAction<ProtectedState> {
  feature = FEATURE_NAME;
  type = type;

  constructor(public payload: Group[]) {}

  handler(state: ProtectedState, action: this): ProtectedState {
    const groups = setStateProperties(state.groups, {
      ids: action.payload.map(group => group.id),
      items: action.payload.reduce(
        (acc, cur) => ({ ...acc, [cur.id]: cur }),
        {},
      ),
    });
    return setStateProperties(state, { groups });
  }
}

@Injectable()
export class GroupsSetCollectionActionEffect {
  @Effect()
  setActiveGroup$ = this.actions$.ofType(type).pipe(
    filter((action: GroupsSetCollectionAction) => !!action.payload),
    withLatestFrom(this.store),
    map(([action, state]: [GroupsSetCollectionAction, AppState]) => ({
      groups: action.payload,
      userConfig: getUserConfig(state),
    })),
    map((res: { groups: Group[]; userConfig: UserConfig }) =>
      res.groups.sort(
        (a, b) =>
          a.id === res.userConfig.activeGroupId
            ? -1
            : b.id === res.userConfig.activeGroupId
              ? 1
              : 0,
      ),
    ),
    map(groups => groups[0]),
    map(
      group =>
        new GroupsSetActiveItemIdAction({
          groupId: group.id,
          shouldNotify: false,
        }),
    ),
  );

  @Effect()
  loadGroupData$ = this.actions$
    .ofType(type)
    .pipe(map(() => new LoadGroupDataAction()));

  constructor(private actions$: Actions, private store: Store<AppState>) {}
}
