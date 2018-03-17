import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {switchMap, tap} from 'rxjs/operators';
import {ActiveGroupService} from '../../active-group.service';
import {MatButtonToggleChange} from '@angular/material';


@Component({
  selector: 'mk-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogComponent {
  mode: 'logs' | 'statistics' = 'logs';
  expenses$ = this.activeOwnerService.asPath$.pipe(
    switchMap(path => this.db.collection(`${path}/expenses`).valueChanges()),
    tap(expenses => console.log('expenses:', expenses))
  );

  constructor(private db: AngularFirestore,
              private activeOwnerService: ActiveGroupService) {
  }

  changePage(change: MatButtonToggleChange) {
    this.mode = change.value;
  }
}
