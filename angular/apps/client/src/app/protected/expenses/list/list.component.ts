import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonToggleChange } from '@angular/material';
import { select, Store } from '@ngrx/store';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { filter, map } from 'rxjs/operators';
import {
  getCategoriesItemsForActiveGroup,
  getCurrenciesItems,
  getExpensesForActiveGroupGroupedAndSortedByDate,
  getTagsItemsForActiveGroup,
  getUsersItems,
} from '../+store/selectors';
import { getActiveGroup } from '../../+store/selectors';
import { AppState } from '../../../+core/store/app.state';
import { User } from '../../../../../../../../+shared/types/user.interface';
import DocumentReference = firebase.firestore.DocumentReference;
import { Category } from '../../../../../../../../+shared/types/category.interface';
import { Tag } from '../../../../../../../../+shared/types/tag.interface';

@Component({
  selector: 'mk-expenses-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  mode: 'logs' | 'statistics' = 'logs';
  expensesGroup$ = this.store.pipe(
    select(getExpensesForActiveGroupGroupedAndSortedByDate),
  );

  constructor(private store: Store<AppState>) {}

  changePage(change: MatButtonToggleChange) {
    this.mode = change.value;
  }

  getCurrencySymbol$(currency: DocumentReference): Observable<string> {
    return this.store.pipe(
      select(getCurrenciesItems),
      map(items => items[currency.id]),
      filter(v => !!v),
      map(currency => currency.symbol),
    );
  }

  getCategory$(category: DocumentReference): Observable<Category> {
    return this.store.pipe(
      select(getCategoriesItemsForActiveGroup),
      map(items => items[category.id]),
      filter(v => !!v),
    );
  }

  getAuthor$(createdBy: DocumentReference): Observable<User> {
    return this.store.pipe(
      select(getUsersItems),
      map(items => items[createdBy.id]),
      filter(v => !!v),
    );
  }

  getTags$(tags: { [key: string]: number }): Observable<Tag[]> {
    return this.store.pipe(
      select(getTagsItemsForActiveGroup),
      map(items =>
        Object.keys(tags)
          .sort((a, b) => (tags[a] > tags[b] ? 1 : -1))
          .map(tagId => items[tagId]),
      ),
    );
  }

  isMoreThanOneUserInGroup$(): Observable<boolean> {
    return this.store.pipe(
      select(getActiveGroup),
      map(group => Object.keys(group.roles).length > 1),
    );
  }
}
