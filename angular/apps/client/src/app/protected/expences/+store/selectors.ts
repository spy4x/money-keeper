import {createSelector} from '@ngrx/store';
import {getGroupActiveItemId, getProtectedState} from '../../+store/selectors';


// Currencies

export const getCurrenciesState = createSelector(
  getProtectedState,
  state => state.currencies
);
export const getCurrenciesIds = createSelector(
  getCurrenciesState,
  items => items.ids
);
export const getCurrenciesItems = createSelector(
  getCurrenciesState,
  items => items.items
);
export const getCurrencies = createSelector(
  getCurrenciesIds,
  getCurrenciesItems,
  (ids, items) => ids.map(id => items[id])
);

// Groups

export const getCategoriesByGroups = createSelector(
  getProtectedState,
  state => state.categories
);
export const getCategoriesIdsForActiveGroup = createSelector(
  getGroupActiveItemId,
  getCategoriesByGroups,
  (activeItemId, categoriesByGroups) => categoriesByGroups[activeItemId] ? categoriesByGroups[activeItemId].ids : []
);
export const getCategoriesItemsForActiveGroup = createSelector(
  getGroupActiveItemId,
  getCategoriesByGroups,
  (activeItemId, categoriesByGroups) => categoriesByGroups[activeItemId] ? categoriesByGroups[activeItemId].items : {}
);

export const getCategoriesForActiveGroup = createSelector(
  getCategoriesIdsForActiveGroup,
  getCategoriesItemsForActiveGroup,
  (ids, items) => ids.map(id => items[id])
);


// Expenses

export const getExpensesByGroups = createSelector(
  getProtectedState,
  state => state.expenses
);
export const getExpensesIdsForActiveGroup = createSelector(
  getGroupActiveItemId,
  getExpensesByGroups,
  (activeItemId, expensesByGroups) => expensesByGroups[activeItemId] ? expensesByGroups[activeItemId].ids : []
);
export const getExpensesItemsForActiveGroup = createSelector(
  getGroupActiveItemId,
  getExpensesByGroups,
  (activeItemId, expensesByGroups) => expensesByGroups[activeItemId] ? expensesByGroups[activeItemId].items : {}
);

export const getExpensesForActiveGroup = createSelector(
  getExpensesIdsForActiveGroup,
  getExpensesItemsForActiveGroup,
  (ids, items) => ids.map(id => items[id])
);
