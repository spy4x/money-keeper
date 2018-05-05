import { getDateSortableString } from '@client/+shared/helpers/date.helper';
import { getExpensesForActiveGroup } from '@client/protected/expenses/+store/selectors';
import { createSelector } from '@ngrx/store';
import { Expense } from '@root/+shared/types/expense.interface';
import * as startOfMonth from 'date-fns/start_of_month';
import { sortExpensesByDate } from '@client/+shared/helpers/sort.helper';
import { roundMoney } from '@client/+shared/helpers/math.helper';

export const getSpendingsByPersonThisMonth = createSelector(
  getExpensesForActiveGroup,
  (items: Expense[]) => {
    const firstDayOfMonth = startOfMonth(new Date());
    const total = items
      .filter(item => item.createdAt >= firstDayOfMonth)
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
        total[userId][currencyId] = roundMoney(total[userId][currencyId]);
      });
    });
    return total;
  },
);

export const getSpendingsToLimitThisMonth = createSelector(
  getExpensesForActiveGroup,
  (expenses: Expense[]) => {
    const firstDayOfMonth = startOfMonth(new Date());
    const result = expenses
      .filter(item => item.createdAt >= firstDayOfMonth)
      .sort(sortExpensesByDate('asc'))
      .reduce((acc, cur) => {
        const dateStr = getDateSortableString(cur.createdAt);
        if (!acc[dateStr]) {
          acc[dateStr] = {};
        }
        if (!acc[dateStr][cur.currency.id]) {
          acc[dateStr][cur.currency.id] = 0;
        }
        acc[dateStr][cur.currency.id] += cur.value;
        return acc;
      }, {});
    Object.keys(result).forEach(date => {
      Object.keys(result[date]).forEach(currencyId => {
        result[date][currencyId] = roundMoney(result[date][currencyId]);
      });
    });
    return result;
  },
);
