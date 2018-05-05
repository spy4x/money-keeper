import { NgModule } from '@angular/core';
import { ProfileAvatarUploadActionEffect } from '@client/protected/profile/+store/actions/avatarUpload.action';
import { ProfileAvatarUploadProgressActionEffect } from '@client/protected/profile/+store/actions/avatarUploadProgress.action';
import { ProfileUpdateActionEffect } from '@client/protected/profile/+store/actions/profileUpdate.action';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { rehydrateFeatureState } from '../../+shared/helpers/localStorageSyncState.helper';
import { BaseAction } from '../../+shared/helpers/state.helper';
import { CategoriesCreateActionEffect } from '../categories/+store/actions/create.action';
import { ExpensesCreateActionEffect } from '../expenses/+store/actions/create.action';
import { ExpensesDeleteActionEffect } from '../expenses/+store/actions/delete.action';
import { ExpensesEditActionEffect } from '../expenses/+store/actions/edit.action';
import { TagsCreateActionEffect } from '../tags/+store/actions/create.action';
import { TagsEditActionEffect } from '../tags/+store/actions/edit.action';
import { GroupsSetActiveItemIdActionEffect } from './actions/groupsSetActiveItemId.action';
import { GroupsSetCollectionActionEffect } from './actions/groupsSetCollection.action';
import { ProtectedInitActionEffect } from './actions/init.action';
import { LoadGroupDataActionEffect } from './actions/loadGroupData.action';
import { UISetDeviceTypeActionEffect } from './actions/uiSetDeviceType.action';
import { ProtectedState, ProtectedStateInitial } from './state';
import { TagsDeleteActionEffect } from '@client/protected/tags/+store/actions/delete.action';

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
      TagsDeleteActionEffect,
      UISetDeviceTypeActionEffect,
      ProfileUpdateActionEffect,
      ProfileAvatarUploadActionEffect,
      ProfileAvatarUploadProgressActionEffect,
    ]),
  ],
})
export class ProtectedStoreModule {}
