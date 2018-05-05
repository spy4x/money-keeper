import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppState } from '@client/+core/store/app.state';
import { getUser } from '@client/+core/store/selectors';
import { GroupsSetActiveItemIdAction } from '@client/protected/+store/actions/groupsSetActiveItemId.action';
import { getActiveGroup, getGroups } from '@client/protected/+store/selectors';
import { select, Store } from '@ngrx/store';
import { filter, first, skip } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'mk-group-selector',
  templateUrl: './group-selector.component.html',
  styleUrls: ['./group-selector.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupSelectorComponent implements OnInit, OnDestroy {
  control = new FormControl();
  groups$ = this.store.pipe(select(getGroups));
  user$ = this.store.pipe(select(getUser));
  activeGroup$ = this.store.pipe(select(getActiveGroup));
  sub = new Subscription();
  @HostBinding('class.hidden') hidden = true;

  constructor(private store: Store<AppState>) {
    this.sub.add(
      this.activeGroup$
        .pipe(filter(v => !!v), first())
        .subscribe(activeGroup => {
          this.control.patchValue(activeGroup.id);
        }),
    );
    this.sub.add(
      this.groups$.pipe(filter(v => !!v)).subscribe(groups => {
        this.hidden = groups.length <= 1;
      }),
    );
    this.control.valueChanges
      .pipe(filter(v => !!v), skip(1))
      .subscribe(groupId => {
        this.store.dispatch(
          new GroupsSetActiveItemIdAction({
            groupId: groupId,
            shouldNotify: true,
          }),
        );
      });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
