import { createSelector } from '@ngrx/store';
import { getActiveGroup, getProtectedState } from '../../+store/selectors';
import { getActiveGroupId } from '../../../+core/store/selectors';
import { Expense } from '../../../../../../../../+shared/types/expense.interface';

// Users

export const getUsersState = createSelector(
  getProtectedState,
  state => state.users,
);
export const getUsersIds = createSelector(getUsersState, items => items.ids);
export const getUsersItems = createSelector(
  getUsersState,
  items => items.items,
);
export const getUsers = createSelector(
  getUsersIds,
  getUsersItems,
  (ids, items) => ids.map(id => items[id]),
);
export const getUsersForActiveGroupWithRoles = createSelector(
  getActiveGroup,
  getUsersItems,
  (group, users) =>
    group && users && Object.keys(users).length
      ? Object.keys(group.roles).map(userId => ({
          user: users[userId],
          role: group.roles[userId],
        }))
      : [],
);

// Currencies

export const getCurrenciesState = createSelector(
  getProtectedState,
  state => state.currencies,
);
export const getCurrenciesIds = createSelector(
  getCurrenciesState,
  items => items.ids,
);
export const getCurrenciesItems = createSelector(
  getCurrenciesState,
  items => items.items,
);
export const getCurrencies = createSelector(
  getCurrenciesIds,
  getCurrenciesItems,
  (ids, items) => ids.map(id => items[id]),
);

// Groups

export const getCategoriesByGroups = createSelector(
  getProtectedState,
  state => state.categories,
);
export const getCategoriesIdsForActiveGroup = createSelector(
  getActiveGroupId,
  getCategoriesByGroups,
  (activeItemId, categoriesByGroups) =>
    categoriesByGroups[activeItemId]
      ? categoriesByGroups[activeItemId].ids
      : [],
);
export const getCategoriesItemsForActiveGroup = createSelector(
  getActiveGroupId,
  getCategoriesByGroups,
  (activeItemId, categoriesByGroups) =>
    categoriesByGroups[activeItemId]
      ? categoriesByGroups[activeItemId].items
      : {},
);

export const getCategoriesForActiveGroup = createSelector(
  getCategoriesIdsForActiveGroup,
  getCategoriesItemsForActiveGroup,
  (ids, items) => ids.map(id => items[id]),
);

// Tags

export const getTagsByGroups = createSelector(
  getProtectedState,
  state => state.tags,
);
export const getTagsIdsForActiveGroup = createSelector(
  getActiveGroupId,
  getTagsByGroups,
  (activeItemId, tagsByGroups) =>
    tagsByGroups[activeItemId] ? tagsByGroups[activeItemId].ids : [],
);
export const getTagsItemsForActiveGroup = createSelector(
  getActiveGroupId,
  getTagsByGroups,
  (activeItemId, tagsByGroups) =>
    tagsByGroups[activeItemId] ? tagsByGroups[activeItemId].items : {},
);

export const getTagsForActiveGroup = createSelector(
  getTagsIdsForActiveGroup,
  getTagsItemsForActiveGroup,
  (ids, items) => ids.map(id => items[id]),
);

// Expenses

export const getExpensesByGroups = createSelector(
  getProtectedState,
  state => state.expenses,
);
export const getExpensesIdsForActiveGroup = createSelector(
  getActiveGroupId,
  getExpensesByGroups,
  (activeItemId, expensesByGroups) =>
    expensesByGroups[activeItemId] ? expensesByGroups[activeItemId].ids : [],
);
export const getExpensesItemsForActiveGroup = createSelector(
  getActiveGroupId,
  getExpensesByGroups,
  (activeItemId, expensesByGroups) =>
    expensesByGroups[activeItemId] ? expensesByGroups[activeItemId].items : {},
);

export const getExpensesForActiveGroup = createSelector(
  getExpensesIdsForActiveGroup,
  getExpensesItemsForActiveGroup,
  (ids, items) => ids.map(id => items[id]),
);
export const getExpensesForActiveGroupGroupedAndSortedByDate = createSelector(
  getExpensesForActiveGroup,
  expenses => {
    const groupedExpenses = expenses
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)) // sort expenses by date
      .reduce((acc, cur) => {
        const year = cur.createdAt.getFullYear();
        const monthNumber = cur.createdAt.getMonth() + 1;
        const monthStr =
          monthNumber < 10 ? '0' + monthNumber : monthNumber + '';
        const day = cur.createdAt.getDate();
        const dayStr = day < 10 ? '0' + day : day + '';
        const dateStr = `${year}-${monthStr}-${dayStr}`;
        if (acc[dateStr]) {
          acc[dateStr].push(cur);
        } else {
          acc[dateStr] = [cur];
        }
        return acc;
      }, {});
    return Object.keys(groupedExpenses)
      .sort((a, b) => (a < b ? 1 : -1)) // sort days
      .map(key => {
        const result = {
          date: key,
          items: groupedExpenses[key],
          total: groupedExpenses[key].reduce((acc, cur: Expense) => {
            const accTotalForCurrency = acc[cur.currency.id]
              ? acc[cur.currency.id]
              : 0;
            acc[cur.currency.id] = accTotalForCurrency + cur.value;
            return acc;
          }, {}),
        };

        result.total = Object.keys(result.total).map(currencyId => {
          const roundedTotal = Math.round(result.total[currencyId] * 100) / 100;
          return { currencyId, total: roundedTotal };
        });
        return result;
      });
  },
);
