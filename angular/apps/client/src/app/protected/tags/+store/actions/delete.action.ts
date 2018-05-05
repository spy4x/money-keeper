import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AppState } from '@client/+core/store/app.state';
import { unwrapCollectionSnapshotChanges } from '@client/+shared/helpers/firestore.helper';
import {
  BaseAction,
  generateActionType,
} from '@client/+shared/helpers/state.helper';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Expense } from '@root/+shared/types/expense.interface';
import { Tag } from '@root/+shared/types/tag.interface';
import { AngularFirestore } from 'angularfire2/firestore';
import { timer } from 'rxjs/observable/timer';
import { first, map, tap, withLatestFrom } from 'rxjs/operators';
import { FEATURE_NAME } from '../../../+store/module';
import { getActiveGroup } from '../../../+store/selectors';
import { ProtectedState } from '../../../+store/state';

const type = generateActionType(FEATURE_NAME, 'Tags - delete');

export class TagsDeleteAction implements BaseAction<ProtectedState> {
  feature = FEATURE_NAME;
  type = type;

  constructor(public payload: Tag) {}

  handler(state: ProtectedState, action: this): ProtectedState {
    return state;
  }
}

@Injectable()
export class TagsDeleteActionEffect {
  @Effect({ dispatch: false })
  delete$ = this.actions$.ofType(type).pipe(
    withLatestFrom(this.store),
    tap(([action, state]: [TagsDeleteAction, AppState]) => {
      const activeGroup = getActiveGroup(state);
      const tag = action.payload;
      const snackBarRef = this.snackBar.open(
        `Tag ${tag.name} will be deleted in a moment`,
        'CANCEL',
        { duration: 4000 },
      );

      const deleteSub = timer(4000).subscribe(() => {
        this.db
          .collection<Expense>(`groups/${activeGroup.id}/expenses`, ref =>
            ref.where(`tags.${tag.id}`, '==', true),
          )
          .snapshotChanges()
          .pipe(map(unwrapCollectionSnapshotChanges), first())
          .subscribe((expenses: Expense[]) => {
            const batch = this.db.firestore.batch();
            expenses.forEach(exp => {
              const tags = Object.keys(exp.tags)
                .filter(tagId => tagId !== tag.id)
                .reduce((acc, tagId) => {
                  acc[tagId] = true;
                  return acc;
                }, {});
              batch.update(
                this.db.doc(`groups/${activeGroup.id}/expenses/${exp.id}`).ref,
                { tags },
              );
            });

            batch.delete(
              this.db.doc<Tag>(`groups/${activeGroup.id}/tags/${tag.id}`).ref,
            );
            batch.commit().catch(error => {
              this.snackBar.open(
                `Tag wasn't deleted on the server. Error`,
                undefined,
                { duration: 2500 },
              );
              console.error('Error deleting tag: ', error);
            });
          });
      });

      const subAction = snackBarRef.onAction().subscribe(() => {
        deleteSub.unsubscribe();
      });
      setTimeout(() => {
        subAction.unsubscribe();
        deleteSub.unsubscribe();
      }, 4050); // this prevents next snackBar from not being opened
    }),
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
  ) {}
}
