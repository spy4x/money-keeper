import {
  BaseAction,
  generateActionType,
  setStateProperties,
} from '../../../+shared/helpers/state.helper';
import { Currency } from '@root/+shared/types/currency.interface';
import { FEATURE_NAME } from '../module';
import { ProtectedState } from '../state';

const type = generateActionType(FEATURE_NAME, 'Currencies - Set collection');

export class CurrenciesSetCollectionAction
  implements BaseAction<ProtectedState> {
  feature = FEATURE_NAME;
  type = type;

  constructor(public payload: Currency[]) {}

  handler(state: ProtectedState, action: this): ProtectedState {
    const currencies = setStateProperties(state.currencies, {
      ids: action.payload.map(group => group.id),
      items: action.payload.reduce(
        (acc, cur) => ({ ...acc, [cur.id]: cur }),
        {},
      ),
    });
    return setStateProperties(state, { currencies });
  }
}
