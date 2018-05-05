import { Expense } from '@root/+shared/types/expense.interface';

export const sortExpensesByDate = (order: 'asc' | 'desc') => (
  a: Expense,
  b: Expense,
) =>
  order === 'asc'
    ? a.createdAt > b.createdAt
      ? 1
      : -1
    : a.createdAt < b.createdAt
      ? 1
      : -1;
