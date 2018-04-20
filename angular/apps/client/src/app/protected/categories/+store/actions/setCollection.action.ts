import {
  BaseAction,
  generateActionType,
  setStateProperties,
} from '../../../../+shared/helpers/state.helper';
import { Category } from '@root/+shared/types/category.interface';
import { FEATURE_NAME } from '../../../+store/module';
import { ProtectedState } from '../../../+store/state';

const type = generateActionType(FEATURE_NAME, 'Categories - Set collection');

export class CategoriesSetCollectionAction
  implements BaseAction<ProtectedState> {
  feature = FEATURE_NAME;
  type = type;

  constructor(public payload: { [key: string]: Category[] }) {}

  handler(state: ProtectedState, action: this): ProtectedState {
    const groupIds = Object.keys(action.payload);
    const categories = setStateProperties(
      state.categories,
      groupIds.reduce(
        (groupAcc, groupId) => ({
          ...groupAcc,
          [groupId]: {
            ids: action.payload[groupId].map(category => category.id),
            items: action.payload[groupId].reduce(
              (categoryItems, category) => ({
                ...categoryItems,
                [category.id]: category,
              }),
              {},
            ),
          },
        }),
        {},
      ),
    );
    return setStateProperties(state, { categories });
  }
}
