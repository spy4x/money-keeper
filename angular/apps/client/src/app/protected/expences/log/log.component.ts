import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {MatButtonToggleChange} from '@angular/material';
import {select, Store} from '@ngrx/store';
import {getExpensesForActiveGroup} from '../+store/selectors';
import {AppState} from '../../../+core/store/app.state';


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
}
