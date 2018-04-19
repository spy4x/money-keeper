import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { rehydrateFeatureState } from '../../+shared/helpers/localStorageSyncState.helper';
import { BaseAction } from '../../+shared/helpers/state.helper';
import { ProtectedState, ProtectedStateInitial } from './state';
import { ProtectedInitActionEffect } from './actions/init.action';
import { GroupsSetCollectionActionEffect } from './actions/groupsSetCollection.action';
import { LoadGroupDataActionEffect } from './actions/loadGroupData.action';
import { CategoriesCreateActionEffect } from '../categories/+store/actions/create.action';
import { ExpensesCreateActionEffect } from '../expenses/+store/actions/create.action';
import { TagsCreateActionEffect } from '../tags/+store/actions/create.action';
import { TagsEditActionEffect } from '../tags/+store/actions/edit.action';
import { GroupsSetActiveItemIdActionEffect } from './actions/groupsSetActiveItemId.action';
import { UISetDeviceTypeActionEffect } from './actions/uiSetDeviceType.action';
import { ExpensesEditActionEffect } from '../expenses/+store/actions/edit.action';
import { ExpensesDeleteActionEffect } from '../expenses/+store/actions/delete.action';

export const FEATURE_NAME = 'protected';

const initialState =
  rehydrateFeatureState<ProtectedState>(FEATURE_NAME) || ProtectedStateInitial;

export function ProtectedReducer(
  state = initialState,
  action: BaseAction<ProtectedState>,
) {
  return action.feature === FEATURE_NAME && action.handler
    ? action.handler(state, action)
    : state;
}

@NgModule({
  imports: [
    StoreModule.forFeature(FEATURE_NAME, ProtectedReducer),
    EffectsModule.forFeature([
      ProtectedInitActionEffect,
      GroupsSetCollectionActionEffect,
      GroupsSetActiveItemIdActionEffect,
      LoadGroupDataActionEffect,
      CategoriesCreateActionEffect,
      ExpensesCreateActionEffect,
      ExpensesEditActionEffect,
      ExpensesDeleteActionEffect,
      TagsCreateActionEffect,
      TagsEditActionEffect,
      UISetDeviceTypeActionEffect,
    ]),
  ],
})
export class ProtectedStoreModule {}
