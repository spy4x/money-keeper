import {BaseAction, generateActionType, setStateProperties} from '../../../+shared/helpers/state.helper';
import {CoreState} from '../core.state';
import {FEATURE_NAME} from '../module';
import {AuthState} from '../types/authState.enum';


const type = generateActionType(FEATURE_NAME, 'Auth - Set state');

export class AuthSetStateAction implements BaseAction<CoreState> {
  feature = FEATURE_NAME;
  type = type;

  constructor(public payload: AuthState) {
  }

  handler(state: CoreState, action: this): CoreState {
    return setStateProperties(state, {authState: action.payload});
  }
}
