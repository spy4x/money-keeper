import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { GroupsSetActiveItemIdAction } from '../../+store/actions/groupsSetActiveItemId.action';
import { getActiveGroup, getGroups } from '../../+store/selectors';
import { AppState } from '../../../+core/store/app.state';
import { getUser } from '../../../+core/store/selectors';
import { Group } from '@root/+shared/types/group.interface';

@Component({
  selector: 'mk-groups-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  activeGroup$ = this.store.pipe(select(getActiveGroup));
  groups$ = this.store.pipe(
    select(getGroups),
    map(groups =>
      groups.sort(
        (a, b) => (a.isPersonal === b.isPersonal ? 0 : a.isPersonal ? -1 : 1),
      ),
    ),
  );
  user$ = this.store.pipe(select(getUser));

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  setActiveGroup(group: Group): void {
    this.store.dispatch(
      new GroupsSetActiveItemIdAction({
        groupId: group.id,
        shouldNotify: true,
      }),
    );
    this.router.navigate(['/']);
  }

  remove(group: Group): void {
    this.snackBar.open(`Delete group is not implemented yet.`, undefined, {
      duration: 2500,
    });
  }
}
