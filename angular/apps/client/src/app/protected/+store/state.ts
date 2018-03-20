import {Category} from '../../../../../../../+shared/types/category.interface';
import {Group} from '../../../../../../../+shared/types/group.interface';
import {Expense} from '../../../../../../../+shared/types/expense.interface';


export interface ProtectedState {
  currencies: {
    ids: string[];
    items: { [id: string]: Group };
  }
  groups: {
    ids: string[];
    items: { [id: string]: Group };
    activeItemId: string;
  }
  categories: {
    [key: string]: {
      ids: string[];
      items: { [id: string]: Category };
    }
  };
  expenses: {
    [key: string]: {
      ids: string[];
      items: { [id: string]: Expense };
    }
  };
}

export const ProtectedStateInitial: ProtectedState = {
  currencies: {
    ids: [],
    items: {},
  },
  groups: {
    ids: [],
    items: {},
    activeItemId: undefined
  },
  categories: {},
  expenses: {}
};
