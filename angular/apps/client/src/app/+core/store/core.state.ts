import { User } from '../../../../../../../+shared/types/user.interface';
import { UserConfig } from '../../../../../../../+shared/types/userConfig.interface';
import { AuthState } from './types/authState.enum';

export interface CoreState {
  authState: AuthState;
  user: User;
  userConfig: UserConfig;
}

export const CoreStateInitial: CoreState = {
  authState: AuthState.notAuthenticated,
  user: undefined,
  userConfig: undefined,
};
