import {User} from '../../../../../../../+shared/types/user.interface';


export interface CoreState {
  user: User;
}

export const CoreStateInitial: CoreState = {
  user: undefined
};
