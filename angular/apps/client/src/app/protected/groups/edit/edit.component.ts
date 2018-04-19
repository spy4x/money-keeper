import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { first, map, switchMap } from 'rxjs/operators';
import { getGroupItems } from '../../+store/selectors';
import { AppState } from '../../../+core/store/app.state';

@Component({
  selector: 'mk-groups-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComponent {
  uploadPercent: Observable<number>;
  group$ = this.activatedRoute.params.pipe(
    map(params => params['id']),
    switchMap(groupId =>
      this.store.pipe(
        select(getGroupItems),
        map(groupItems => groupItems[groupId]),
      ),
    ),
  );

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
  ) {}

  uploadFile(event, groupId) {
    const file = event.target.files[0];
    const filePath = `groups/${groupId}/avatar.jpg`;
    const task = this.storage.upload(filePath, file);
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task
      .downloadURL()
      .pipe(first())
      .subscribe(photoURL =>
        this.db.doc(`groups/${groupId}`).update({ photoURL }),
      );
  }
}
