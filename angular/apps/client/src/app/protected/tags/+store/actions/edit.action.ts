import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AngularFirestore } from 'angularfire2/firestore';
import { tap, withLatestFrom } from 'rxjs/operators';
import { FEATURE_NAME } from '../../../+store/module';
import { getActiveGroup } from '../../../+store/selectors';
import { ProtectedState } from '../../../+store/state';
import { AppState } from '../../../../+core/store/app.state';
import {
  BaseAction,
  generateActionType,
} from '../../../../+shared/helpers/state.helper';
import { Tag } from '@root/+shared/types/tag.interface';

const type = generateActionType(FEATURE_NAME, 'Tags - edit');

export class TagsEditAction implements BaseAction<ProtectedState> {
  feature = FEATURE_NAME;
  type = type;

  constructor(public payload: Tag) {}

  handler(state: ProtectedState, action: this): ProtectedState {
    return state;
  }
}

@Injectable()
export class TagsEditActionEffect {
  @Effect({ dispatch: false })
  save$ = this.actions$.ofType(type).pipe(
    withLatestFrom(this.store),
    tap(([action, state]: [TagsEditAction, AppState]) => {
      const activeGroup = getActiveGroup(state);

      const tag = action.payload;

      this.db
        .doc<Tag>(`groups/${activeGroup.id}/tags/${tag.id}`)
        .update(tag)
        .catch(error => {
          this.snackBar.open(
            `Tag wasn't saved to the server. Error`,
            undefined,
            { duration: 2500 },
          );
          console.error('Error editing tag: ', error);
        });
      // We do success actions in sync way, rather then call them in ".then()" method, because ".then()"
      // is called only for success write to the server, not to local storage
      this.snackBar.open(`Tag "${tag.name}" saved`, '', { duration: 2500 });
    }),
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
  ) {}
}
