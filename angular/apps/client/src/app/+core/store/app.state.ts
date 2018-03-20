import {CoreState, CoreStateInitial} from './core.state';
import {ProtectedState} from '../../protected/+store/state';


export interface AppState {
  core: CoreState;
  protected?: ProtectedState
}

export const AppStateInitial: AppState = {
  core: CoreStateInitial,
  protected: undefined
};
