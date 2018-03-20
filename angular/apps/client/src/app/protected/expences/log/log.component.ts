import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {MatButtonToggleChange} from '@angular/material';
import {select, Store} from '@ngrx/store';
import {getCategoriesItemsForActiveGroup, getCurrenciesItems, getExpensesForActiveGroup} from '../+store/selectors';
import {AppState} from '../../../+core/store/app.state';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import DocumentReference = firebase.firestore.DocumentReference;
import {filter, map} from 'rxjs/operators';


@Component({
  selector: 'mk-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogComponent {
  mode: 'logs' | 'statistics' = 'logs';
  expenses$ = this.store.pipe(select(getExpensesForActiveGroup));

  constructor(private store: Store<AppState>) {
  }

  changePage(change: MatButtonToggleChange) {
    this.mode = change.value;
  }

  getCurrencySymbol$(currency: DocumentReference): Observable<string>{
    return this.store.pipe(
      select(getCurrenciesItems),
      map(items => items[currency.id]),
      filter(v => !!v),
      map(currency => currency.symbol)
    );
  }

  getCategoryName$(category: DocumentReference): Observable<string>{
    return this.store.pipe(
      select(getCategoriesItemsForActiveGroup),
      map(items => items[category.id]),
      filter(v => !!v),
      map(category => category.name)
    );
  }
}
