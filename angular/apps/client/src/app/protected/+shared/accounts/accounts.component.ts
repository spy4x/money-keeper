import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore} from 'angularfire2/firestore';
import {filter, map, switchMap, tap} from 'rxjs/operators';
import {unwrapCollectionSnapshotChanges, unwrapDocSnapshotChanges} from '../../../+shared/helpers/firestore.helper';
import {ActiveGroupService} from '../../active-group.service';
import {Group} from '../../data-access/group.interface';


@Component({
  selector: 'mk-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountsComponent {
  user$ = this.afAuth.authState.pipe(
    switchMap(user => this.db.doc(`users/${user.uid}`).snapshotChanges()),
    map(unwrapDocSnapshotChanges)
  );
  groups$ = this.afAuth.authState.pipe(
    filter(v => !!v),
    switchMap(user => this.db
      .collection<Group>('groups', ref => ref.where(`roles.${user.uid}`, '>', ''))
      .snapshotChanges()
    ),
    map(unwrapCollectionSnapshotChanges),
  );
  activeOwnerPath$ = this.activeOwnerService.asPath$;

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private db: AngularFirestore,
              private activeOwnerService: ActiveGroupService) {
  }

  signOut(): void {
    this.afAuth.auth
      .signOut()
      .then(() => this.router.navigate(['/public/sign-in']))
      .catch(console.error);
  }

  setActiveOwnerPath(path: string): void {
    this.activeOwnerService.setPath(path);
    this.router.navigate(['/expenses'])
  }
}
