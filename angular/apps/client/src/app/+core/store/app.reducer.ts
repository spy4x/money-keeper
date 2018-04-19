import { Action, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { environment } from '../../../environments/environment';
import { AppState } from './app.state';
import { LocalStorageSyncReducer } from '../../+shared/helpers/localStorageSyncState.helper';
import { CoreReducer } from './module';

export const AppReducers: ActionReducerMap<AppState> = {
  core: CoreReducer,
};

export function AppStateLevelReducer(reducer) {
  return function(state, action) {
    switch (action.type) {
      // case AuthSignOutActionType:
      //   state = AuthSignOutActionHandler(state, action as AuthSignOutAction);
      //   break;
      default:
        break;
    }
    return reducer(state, action);
  };
}

export function LoggerReducer(reducer): any {
  return storeLogger({ collapsed: true })(reducer);
}

const productionReducers = [AppStateLevelReducer, LocalStorageSyncReducer];
const developmentReducers = [
  LoggerReducer /*storeFreeze or similar meta reducers*/,
];
const testReducers = [
  /*storeFreeze or similar meta reducers*/
];

export const AppMetaReducers: MetaReducer<AppState, Action>[] =
  environment.type === 'prod'
    ? productionReducers
    : environment.type === 'dev'
      ? [...productionReducers, ...developmentReducers]
      : [...productionReducers, ...testReducers]; // 'test'
