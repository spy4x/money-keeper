import {BaseAction, generateActionType, setStateProperties} from '../../../../+shared/helpers/state.helper';
import {FEATURE_NAME} from '../../../+store/module';
import {ProtectedState} from '../../../+store/state';
import {Tag} from '../../../../../../../../../+shared/types/tag.interface';


const type = generateActionType(FEATURE_NAME, 'Tags - Set collection');

export class TagsSetCollectionAction implements BaseAction<ProtectedState> {
  feature = FEATURE_NAME;
  type = type;

  constructor(public payload: {[key:string]: Tag[]}) {
  }

  handler(state: ProtectedState, action: this): ProtectedState {
    const groupIds = Object.keys(action.payload);
    const tags = setStateProperties(
      state.tags,
      groupIds.reduce((groupAcc, groupId) => ({
        ...groupAcc,
        [groupId]: {
          ids: action.payload[groupId].map(item => item.id),
          items: action.payload[groupId].reduce((items, item) => ({...items, [item.id]: item}),{})
        }
      }), {})
    );
    return setStateProperties(state, {tags});
  }
}
