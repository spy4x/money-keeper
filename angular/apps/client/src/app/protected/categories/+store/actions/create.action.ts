import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {Actions, Effect} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AngularFirestore} from 'angularfire2/firestore';
import {tap, withLatestFrom} from 'rxjs/operators';
import {FEATURE_NAME} from '../../../+store/module';
import {getActiveGroup} from '../../../+store/selectors';
import {ProtectedState} from '../../../+store/state';
import {AppState} from '../../../../+core/store/app.state';
import {getUser} from '../../../../+core/store/selectors';
import {BaseAction, generateActionType} from '../../../../+shared/helpers/state.helper';
import {Category} from '../../../../../../../../../+shared/types/category.interface';


const type = generateActionType(FEATURE_NAME, 'Categories - create');

export class CategoriesCreateAction implements BaseAction<ProtectedState> {
  feature = FEATURE_NAME;
  type = type;

  constructor(public payload: Category) {
  }

  handler(state: ProtectedState, action: this): ProtectedState {
    return state;
  }
}

@Injectable()
export class CategoriesCreateActionEffect {

  @Effect({dispatch: false}) save$ = this.actions$
    .ofType(type)
    .pipe(
      withLatestFrom(this.store),
      tap(([action, state]: [CategoriesCreateAction, AppState]) => {
        const user = getUser(state);
        const activeGroup = getActiveGroup(state);

        const category = action.payload;
        category.createdBy = this.db.doc(`users/${user.id}`).ref;
        category.createdAt = new Date();
        this.db.collection<Category>(`groups/${activeGroup.id}/categories`).add(category)
          .catch(error => {
            this.snackBar.open(`Category "${category.name}" wasn't saved to the server. Error`, undefined, {duration: 2500});
            console.error('Error adding category: ', error);
          });
        // We do success actions in sync way, rather then call them in ".then()" method, because ".then()"
        // is called only for success write to the server, not to local storage
        this.snackBar.open(`Category "${category.name}" created`, undefined, {duration: 2500});
        this.location.back();
      }),
    );

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private db: AngularFirestore,
              private router: Router,
              private location: Location,
              private snackBar: MatSnackBar) {
  }
}

