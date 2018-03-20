import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProtectedState} from './state';
import {FEATURE_NAME} from './module';


export const getProtectedState = createFeatureSelector<ProtectedState>(FEATURE_NAME);

export const getGroupItems = createSelector(
  getProtectedState,
  state => state.groups.items
);
export const getGroupIds = createSelector(
  getProtectedState,
  state => state.groups.ids
);
export const getGroupActiveItemId = createSelector(
  getProtectedState,
  state => state.groups.activeItemId
);

export const getGroups = createSelector(
  getGroupItems,
  getGroupIds,
  (items, ids) => ids.map(id => items[id])
);
export const getActiveGroup = createSelector(
  getGroupItems,
  getGroupActiveItemId,
  (items, activeItemId) => activeItemId ? items[activeItemId] : undefined
);
