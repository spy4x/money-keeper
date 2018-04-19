import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { first } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../+core/store/app.state';
import { getUser } from '../../+core/store/selectors';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthSetStateAction } from '../../+core/store/actions/authSetState.action';
import { UserSignedOutAction } from '../../+core/store/actions/userSignedOut.action';

@Component({
  selector: 'mk-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  uploadPercent: Observable<number>;
  user$ = this.store.pipe(select(getUser));

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private store: Store<AppState>,
    private afAuth: AngularFireAuth,
  ) {}

  uploadFile(event, userId) {
    const file = event.target.files[0];
    const filePath = `users/${userId}/avatar.jpg`;
    const task = this.storage.upload(filePath, file);
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task
      .downloadURL()
      .pipe(first())
      .subscribe(photoURL =>
        this.db.doc(`users/${userId}`).update({ photoURL }),
      );
  }

  signOut(): void {
    this.store.dispatch(new UserSignedOutAction());
  }
}
