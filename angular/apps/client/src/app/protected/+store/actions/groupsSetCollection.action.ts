import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {filter, map} from 'rxjs/operators';
import {BaseAction, generateActionType, setStateProperties} from '../../../+shared/helpers/state.helper';
import {Group} from '../../../../../../../../+shared/types/group.interface';
import {ExpensesInitAction} from '../../expences/+store/actions/init.action';
import {FEATURE_NAME} from '../module';
import {ProtectedState} from '../state';
import {GroupsSetActiveItemIdAction} from './groupsSetActiveItemId.action';


const type = generateActionType(FEATURE_NAME, 'Set groups');

export class GroupsSetCollectionAction implements BaseAction<ProtectedState> {
  feature = FEATURE_NAME;
  type = type;

  constructor(public payload: Group[]) {
  }

  handler(state: ProtectedState, action: this): ProtectedState {
    const groups = setStateProperties(state.groups, {
      ids: action.payload.map(group => group.id),
      items: action.payload.reduce((acc, cur) => ({...acc, [cur.id]: cur}), {}),
    });
    return setStateProperties(state, {groups});
  }
}


@Injectable()
export class SetGroupsActionEffect {

  @Effect() setActiveGroup$ = this.actions$
    .ofType(type)
    .pipe(
      filter((action: GroupsSetCollectionAction) => !!action.payload),
      map((action: GroupsSetCollectionAction) => action.payload.find(group => group.isPersonal)),
      map(group => new GroupsSetActiveItemIdAction(group.id))
    );

  @Effect() notifyExpensesModule$ = this.actions$
    .ofType(type)
    .pipe(
      map(() => new ExpensesInitAction())
    );

  constructor(private actions$: Actions) {
  }
}
