import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getActiveGroupId } from '../../+core/store/selectors';
import { FEATURE_NAME } from './module';
import { ProtectedState } from './state';

export const getProtectedState = createFeatureSelector<ProtectedState>(
  FEATURE_NAME,
);

export const getGroupItems = createSelector(
  getProtectedState,
  state => state.groups.items,
);
export const getGroupIds = createSelector(
  getProtectedState,
  state => state.groups.ids,
);

export const getGroups = createSelector(
  getGroupItems,
  getGroupIds,
  (items, ids) => ids.map(id => items[id]),
);
export const getActiveGroup = createSelector(
  getGroupItems,
  getActiveGroupId,
  (items, activeItemId) => (activeItemId ? items[activeItemId] : undefined),
);
