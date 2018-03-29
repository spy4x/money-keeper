import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {rehydrateFeatureState} from '../../+shared/helpers/localStorageSyncState.helper';
import {BaseAction} from '../../+shared/helpers/state.helper';
import {AuthSetStateActionEffect} from './actions/authSetState.action';
import {UserSignedInActionEffect} from './actions/userSignedIn.action';
import {UserSignedOutActionEffect} from './actions/userSignedOut.action';
import {AppMetaReducers, AppReducers} from './app.reducer';
import {AppStateInitial} from './app.state';
import {CoreState, CoreStateInitial} from './core.state';


export const FEATURE_NAME = 'core';

export const CoreInitialStateRehydrated = rehydrateFeatureState<CoreState>(FEATURE_NAME) || CoreStateInitial;

export function CoreReducer(state = CoreInitialStateRehydrated, action: BaseAction<CoreState>) {
  return action.feature === FEATURE_NAME && action.handler ? action.handler(state, action) : state;
}
@NgModule({
  imports: [
    StoreModule.forRoot(AppReducers, {
      initialState: AppStateInitial,
      metaReducers: AppMetaReducers
    }),
    EffectsModule.forRoot([]),
    StoreModule.forFeature(FEATURE_NAME, CoreReducer),
    EffectsModule.forFeature([
      AuthSetStateActionEffect,
      UserSignedInActionEffect,
      UserSignedOutActionEffect
    ]),
  ],
})
export class CoreStoreModule {
}

