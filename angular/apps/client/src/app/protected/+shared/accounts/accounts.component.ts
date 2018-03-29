import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../+core/store/app.state';
import {getUser} from '../../../+core/store/selectors';


@Component({
  selector: 'mk-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountsComponent {
  user$ = this.store.pipe(select(getUser));

  constructor(private store: Store<AppState>) {
  }
}
