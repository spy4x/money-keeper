import {User} from '../../../../../../../+shared/types/user.interface';
import {UserConfig} from '../../../../../../../+shared/types/userConfig.interface';


export interface CoreState {
  user: User;
  userConfig: UserConfig
}

export const CoreStateInitial: CoreState = {
  user: undefined,
  userConfig: undefined
};
