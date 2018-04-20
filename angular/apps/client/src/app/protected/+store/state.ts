import { Category } from '@root/+shared/types/category.interface';
import { Currency } from '@root/+shared/types/currency.interface';
import { Expense } from '@root/+shared/types/expense.interface';
import { Group } from '@root/+shared/types/group.interface';
import { Tag } from '@root/+shared/types/tag.interface';
import { User } from '@root/+shared/types/user.interface';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export interface ProtectedState {
  ui: {
    isMenuOpened: boolean;
    deviceType: DeviceType;
  };
  currencies: {
    ids: string[];
    items: { [id: string]: Currency };
  };
  users: {
    ids: string[];
    items: { [id: string]: User };
  };
  groups: {
    ids: string[];
    items: { [id: string]: Group };
  };
  categories: {
    [key: string]: {
      ids: string[];
      items: { [id: string]: Category };
    };
  };
  expenses: {
    [key: string]: {
      ids: string[];
      items: { [id: string]: Expense };
    };
  };
  tags: {
    [key: string]: {
      ids: string[];
      items: { [id: string]: Tag };
    };
  };
}

export const ProtectedStateInitial: ProtectedState = {
  ui: {
    isMenuOpened: false,
    deviceType: 'mobile',
  },
  currencies: {
    ids: [],
    items: {},
  },
  users: {
    ids: [],
    items: {},
  },
  groups: {
    ids: [],
    items: {},
  },
  categories: {},
  expenses: {},
  tags: {},
};
