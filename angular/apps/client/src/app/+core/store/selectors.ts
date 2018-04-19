import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoreState } from './core.state';
import { FEATURE_NAME } from './module';

export const getCoreState = createFeatureSelector<CoreState>(FEATURE_NAME);

export const getUser = createSelector(getCoreState, state => state.user);

export const getUserConfig = createSelector(
  getCoreState,
  state => state.userConfig,
);

export const getActiveGroupId = createSelector(
  getUserConfig,
  userConfig => (userConfig ? userConfig.activeGroupId : undefined),
);

export const isAuthenticated = createSelector(getUser, user => !!user);
