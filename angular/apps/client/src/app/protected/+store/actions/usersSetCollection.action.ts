import { FEATURE_NAME } from '../module';
import { ProtectedState } from '../state';
import {
  BaseAction,
  generateActionType,
  setStateProperties,
} from '../../../+shared/helpers/state.helper';
import { User } from '@root/+shared/types/user.interface';

const type = generateActionType(FEATURE_NAME, 'Users - Set collection');

export class UsersSetCollectionAction implements BaseAction<ProtectedState> {
  feature = FEATURE_NAME;
  type = type;

  constructor(public payload: User[]) {}

  handler(state: ProtectedState, action: this): ProtectedState {
    const users = setStateProperties(state.users, {
      ids: action.payload.map(item => item.id),
      items: action.payload.reduce(
        (items, item) => ({ ...items, [item.id]: item }),
        {},
      ),
    });
    return setStateProperties(state, { users });
  }
}
