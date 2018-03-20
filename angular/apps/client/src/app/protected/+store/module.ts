import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {rehydrateFeatureState} from '../../+shared/helpers/localStorageSyncState.helper';
import {BaseAction} from '../../+shared/helpers/state.helper';
import {ProtectedState, ProtectedStateInitial} from './state';
import {ProtectedInitActionEffect} from './actions/init.action';
import {SetGroupsActionEffect} from './actions/groupsSetCollection.action';
import {ExpensesInitActionEffect} from '../expences/+store/actions/init.action';
import {CategoriesCreateActionEffect} from '../expences/+store/actions/categoriesCreate.action';
import {ExpensesCreateActionEffect} from '../expences/+store/actions/expensesCreate.action';


export const FEATURE_NAME = 'protected';

const initialState = rehydrateFeatureState<ProtectedState>(FEATURE_NAME) || ProtectedStateInitial;

export function ProtectedReducer(state = initialState, action: BaseAction<ProtectedState>) {
  return action.feature === FEATURE_NAME && action.handler ? action.handler(state, action) : state;
}

@NgModule({
  imports: [
    StoreModule.forFeature(FEATURE_NAME, ProtectedReducer),
    EffectsModule.forFeature([
      ProtectedInitActionEffect,
      SetGroupsActionEffect,
      ExpensesInitActionEffect,
      CategoriesCreateActionEffect,
      ExpensesCreateActionEffect
    ]),
  ],
})
export class ProtectedStoreModule {
}
