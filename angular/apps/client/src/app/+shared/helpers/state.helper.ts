import { Action } from '@ngrx/store';

export function setStateProperties<T>(state: T, properties: Partial<T>): T {
  return Object.assign({}, state, properties);
}

export interface BaseAction<T> extends Action {
  readonly type: string;
  readonly feature: string;

  handler(state: T, action: this): T;
}

const actionTypes: string[] = [];

export function generateActionType(
  feature: string,
  description: string,
): string {
  const actionType = `${feature.toUpperCase()} / ${description
    .charAt(0)
    .toUpperCase() + description.slice(1)}`;
  if (actionTypes.indexOf(actionType) >= 0) {
    throw new Error(`Action type ${actionType} is not unique.`);
  }
  actionTypes.push(actionType);
  return actionType;
}
