import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { AppState } from '@client/+core/store/app.state';
import { getCurrenciesItems } from '@client/protected/expenses/+store/selectors';
import { getSpendingsToLimitThisMonth } from '@client/protected/home/+store/selectors';
import { select, Store } from '@ngrx/store';
import * as format from 'date-fns/format';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest, filter } from 'rxjs/operators';
import { Currency } from '@root/+shared/types/currency.interface';
import { roundMoney } from '@client/+shared/helpers/math.helper';

enum Mode {
  daily = 'Daily',
  monthly = 'Monthly',
}

@Component({
  selector: 'mk-widget-spendings-to-limit',
  templateUrl: './spendings-to-limit.component.html',
  styleUrls: ['./spendings-to-limit.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpendingsToLimitComponent {
  Mode = Mode;
  mode$ = new BehaviorSubject<Mode>(Mode.monthly);
  refLines: { name: string; value: number }[];
  allCurrenciesItems: { [key: string]: Currency };
  spendingsToLimit$ = this.store.pipe(
    select(getSpendingsToLimitThisMonth),
    combineLatest(
      this.mode$,
      this.store.pipe(
        select(getCurrenciesItems),
        filter(v => !!Object.keys(v).length),
      ),
      (spendingsThisMonth, mode, currenciesItems) => {
        this.allCurrenciesItems = currenciesItems;
        const result = [];
        if (mode === Mode.daily) {
          this.refLines = [{ name: 'Daily limit', value: 5000 }];
          Object.keys(spendingsThisMonth).map(date => {
            Object.keys(spendingsThisMonth[date]).map(currencyId => {
              const entry = result.find(e => e.name === currencyId);
              const newPoint = {
                name: date,
                value: spendingsThisMonth[date][currencyId],
              };
              if (!entry) {
                result.push({
                  name: currencyId,
                  series: [newPoint],
                });
              } else {
                entry.series.push(newPoint);
              }
            });
          });
        } else {
          this.refLines = [{ name: 'Monthly limit', value: 60000 }];
          let subTotal = 0;
          Object.keys(spendingsThisMonth).map(date => {
            Object.keys(spendingsThisMonth[date]).map(currencyId => {
              const entry = result.find(e => e.name === currencyId);
              subTotal = roundMoney(
                subTotal + spendingsThisMonth[date][currencyId],
              );
              const newPoint = {
                name: date,
                value: subTotal,
              };
              if (!entry) {
                result.push({
                  name: currencyId,
                  series: [newPoint],
                });
              } else {
                entry.series.push(newPoint);
              }
            });
          });
        }
        return result;
      },
    ),
  );

  constructor(private store: Store<AppState>) {}

  formatDateString(dateString: string) {
    return format(new Date(dateString), 'Do - ddd');
  }
}
