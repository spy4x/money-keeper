import { getExpensesForActiveGroup } from '@client/protected/expenses/+store/selectors';
import { createSelector } from '@ngrx/store';
import { Expense } from '@root/+shared/types/expense.interface';
import * as startOfMonth from 'date-fns/start_of_month';

export const getSpendingsByPersonThisMonth = createSelector(
  getExpensesForActiveGroup,
  (items: Expense[]) => {
    const firstDayOfMonth = startOfMonth(new Date());
    const total = items
      .filter(item => item.createdAt > firstDayOfMonth)
      .reduce(
        (
          acc: { [userId: string]: { [currencyId: string]: number } },
          cur: Expense,
        ) => {
          if (!acc[cur.createdBy.id]) {
            acc[cur.createdBy.id] = {};
          }
          if (!acc[cur.createdBy.id][cur.currency.id]) {
            acc[cur.createdBy.id][cur.currency.id] = 0;
          }
          acc[cur.createdBy.id][cur.currency.id] += cur.value;
          return acc;
        },
        {},
      );
    Object.keys(total).forEach(userId => {
      Object.keys(total[userId]).forEach(currencyId => {
        total[userId][currencyId] =
          Math.round(total[userId][currencyId] * 100) / 100;
      });
    });
    return total;
  },
);
