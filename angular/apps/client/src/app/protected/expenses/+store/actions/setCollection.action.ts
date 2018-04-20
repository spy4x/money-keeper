import {
  BaseAction,
  generateActionType,
  setStateProperties,
} from '../../../../+shared/helpers/state.helper';
import { FEATURE_NAME } from '../../../+store/module';
import { ProtectedState } from '../../../+store/state';
import { Expense } from '@root/+shared/types/expense.interface';

const type = generateActionType(FEATURE_NAME, 'Expenses - Set collection');

export class ExpensesSetCollectionAction implements BaseAction<ProtectedState> {
  feature = FEATURE_NAME;
  type = type;

  constructor(public payload: { [key: string]: Expense[] }) {}

  handler(state: ProtectedState, action: this): ProtectedState {
    const groupIds = Object.keys(action.payload);
    const expenses = setStateProperties(
      state.expenses,
      groupIds.reduce(
        (groupAcc, groupId) => ({
          ...groupAcc,
          [groupId]: {
            ids: action.payload[groupId].map(item => item.id),
            items: action.payload[groupId].reduce(
              (items, item) => ({ ...items, [item.id]: item }),
              {},
            ),
          },
        }),
        {},
      ),
    );
    return setStateProperties(state, { expenses });
  }
}
