import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { AppState } from '@client/+core/store/app.state';
import {
  getCurrenciesItems,
  getUsersItems,
} from '@client/protected/expenses/+store/selectors';
import { getSpendingsByPersonThisMonth } from '@client/protected/home/+store/selectors';
import { select, Store } from '@ngrx/store';
import { Currency } from '@root/+shared/types/currency.interface';
import { User } from '@root/+shared/types/user.interface';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest, filter } from 'rxjs/operators';

let that: SpendingsByPersonComponent;

@Component({
  selector: 'mk-widget-spendings-by-person',
  templateUrl: './spendings-by-person.component.html',
  styleUrls: ['./spendings-by-person.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpendingsByPersonComponent {
  allUsersItems: { [key: string]: User };
  allCurrenciesItems: { [key: string]: Currency };
  availableCurrenciesItems: Currency[];
  selectedCurrency$ = new BehaviorSubject<Currency>(undefined);
  spendingsByPerson$ = this.store.pipe(
    select(getSpendingsByPersonThisMonth),
    combineLatest(
      this.store.pipe(
        select(getUsersItems),
        filter(v => !!Object.keys(v).length),
      ),
      this.store.pipe(
        select(getCurrenciesItems),
        filter(v => !!Object.keys(v).length),
      ),
      (sbp, usersItems, currenciesItems) => {
        this.allUsersItems = usersItems;
        this.allCurrenciesItems = currenciesItems;
        this.availableCurrenciesItems = Object.keys(sbp).reduce(
          (acc, userId) => {
            const currencies = Object.keys(sbp[userId])
              .map(currencyId => this.allCurrenciesItems[currencyId])
              .filter(currency => !acc.find(curr => curr.id === currency.id));
            return [...acc, ...currencies];
          },
          [],
        );
        this.selectedCurrency$.next(this.availableCurrenciesItems[0]);
        return sbp;
      },
    ),
    combineLatest(this.selectedCurrency$, (sbp, selectedCurrency) =>
      Object.keys(sbp)
        .map(userId => ({
          name: userId,
          value: sbp[userId][selectedCurrency.id] || 0,
        }))
        .sort((a, b) => (a.value < b.value ? 1 : -1)),
    ),
  );

  constructor(private store: Store<AppState>) {
    that = this;
  }

  tooltipFormatting({ data }) {
    const user = that.allUsersItems[data.name];
    const currency = that.selectedCurrency$.value;
    return `
      <img src="${user.photoURL}" class="avatar avatar--sm m-t-1"/>
      <span class="tooltip-label">${user.displayName}</span>
      <span class="tooltip-val">${data.value}${currency.symbol}</span>
    `;
  }

  nameFormatting(name) {
    return that.allUsersItems[name].displayName;
  }

  valueFormatting(value) {
    return value + that.selectedCurrency$.value.symbol;
  }
}
