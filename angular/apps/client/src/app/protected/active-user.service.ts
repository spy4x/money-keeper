import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {map} from 'rxjs/operators';
import {User} from './data-access/user.interface';
import DocumentReference = firebase.firestore.DocumentReference;


@Injectable()
export class ActiveUserService {
  private activeUserPathSubject = new BehaviorSubject<string | undefined>(undefined);
  asPath$ = this.activeUserPathSubject.asObservable();
  asRef$ = this.asPath$.pipe(map(path => this.db.doc<User>(path).ref));

  constructor(private db: AngularFirestore) {
  }

  setPath(path: string) {
    if (path !== this.activeUserPathSubject.getValue()) {
      this.activeUserPathSubject.next(path);
    }
    console.log('activeUserPath$', path);
  }

  getPath(): string {
    return this.activeUserPathSubject.getValue();
  }

  getRef(): DocumentReference {
    return this.db.doc<User>(this.activeUserPathSubject.getValue()).ref;
  }
}
