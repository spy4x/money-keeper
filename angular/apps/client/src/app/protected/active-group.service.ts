import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {filter, map, switchMap} from 'rxjs/operators';
import {Group} from './data-access/group.interface';


@Injectable()
export class ActiveGroupService {
  private subject = new BehaviorSubject<string | undefined>(undefined);
  asPath$ = this.subject.asObservable();
  asRef$ = this.asPath$.pipe(map(path => this.db.doc<Group>(path).ref));

  constructor(private db: AngularFirestore) {
  }

  setPath(path: string) {
    if (path !== this.subject.getValue()) {
      this.subject.next(path);
    }
    console.log('activeGroupPath$', path);
  }

  getPath(): string {
    return this.subject.getValue();
  }
}
