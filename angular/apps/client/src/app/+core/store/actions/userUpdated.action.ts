import {
  BaseAction,
  generateActionType,
  setStateProperties,
} from '../../../+shared/helpers/state.helper';
import { FEATURE_NAME } from '../module';
import { CoreState } from '../core.state';
import { User } from '@root/+shared/types/user.interface';

const type = generateActionType(FEATURE_NAME, 'User updated');

export class UserUpdatedAction implements BaseAction<CoreState> {
  feature = FEATURE_NAME;
  type = type;

  constructor(public payload: User) {}

  handler(state: CoreState, action: this): CoreState {
    return setStateProperties(state, { user: action.payload });
  }
}
