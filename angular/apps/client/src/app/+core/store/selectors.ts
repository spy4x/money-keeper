import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CoreState} from './core.state';
import {FEATURE_NAME} from './module';


export const getCoreState = createFeatureSelector<CoreState>(FEATURE_NAME);


export const getUser = createSelector(
  getCoreState,
  state => state.user
);

export const isAuthenticated = createSelector(
  getUser,
  user => !!user
);
