import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {AngularFireAuth} from 'angularfire2/auth';
import {getActiveGroup, getGroups} from '../../+store/selectors';
import {AppState} from '../../../+core/store/app.state';
import {getUser} from '../../../+core/store/selectors';
import {Group} from '../../../../../../../../+shared/types/group.interface';
import {GroupsSetActiveItemIdAction} from '../../+store/actions/groupsSetActiveItemId.action';


@Component({
  selector: 'mk-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountsComponent {
  user$ = this.store.pipe(select(getUser));
  activeGroup$ = this.store.pipe(select(getActiveGroup));
  groups$ = this.store.pipe(select(getGroups));

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private store: Store<AppState>) {
  }

  signOut(): void {
    this.afAuth.auth
      .signOut()
      .catch(console.error);
  }

  setActiveGroup(group: Group): void {
    this.store.dispatch(new GroupsSetActiveItemIdAction(group.id));
    this.router.navigate(['/expenses']);
  }
}
