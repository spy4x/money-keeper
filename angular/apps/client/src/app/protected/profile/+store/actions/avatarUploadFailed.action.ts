import {
  BaseAction,
  generateActionType,
  setStateProperties,
} from '@client/+shared/helpers/state.helper';
import { FEATURE_NAME } from '@client/protected/+store/module';
import { ProtectedState } from '@client/protected/+store/state';

const type = generateActionType(
  FEATURE_NAME,
  'Profile - Avatar upload - Failed',
);

export class ProfileAvatarUploadFailedAction
  implements BaseAction<ProtectedState> {
  feature = FEATURE_NAME;
  type = type;

  handler(state: ProtectedState, action: this): ProtectedState {
    const profile = setStateProperties(state.profile, {
      isAvatarUploadInProgress: false,
      uploadProgress$: null,
    });
    return setStateProperties(state, { profile });
  }
}
