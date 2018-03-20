import {BaseAction, generateActionType, setStateProperties} from '../../../+shared/helpers/state.helper';
import {FEATURE_NAME} from '../module';
import {ProtectedState} from '../state';


const type = generateActionType(FEATURE_NAME, 'Groups - Set activeItemId');

export class GroupsSetActiveItemIdAction implements BaseAction<ProtectedState> {
  feature = FEATURE_NAME;
  type = type;

  constructor(public payload: string) {
  }

  handler(state: ProtectedState, action: this): ProtectedState {
    const groups = setStateProperties(state.groups, {activeItemId: action.payload});
    return setStateProperties(state, {groups});
  }
}
