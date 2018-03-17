import {Action, AngularFirestore, DocumentChangeAction} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';
import * as firebase from 'firebase/app';
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;


export const getCollectionEntities = (db: AngularFirestore, path: string) =>
  db.collection(path)
    .snapshotChanges()
    .pipe(
      map(unwrapCollectionSnapshotChanges)
    );

export const getDocEntity = (db: AngularFirestore, path: string) =>
  db.doc(path)
    .snapshotChanges()
    .pipe(
      map(unwrapDocSnapshotChanges)
    );

export const unwrapCollectionSnapshotChanges = (actions: DocumentChangeAction[]): any[] => actions.map(a => {
  const data = a.payload.doc.data();
  const id = a.payload.doc.id;
  return {id, ...data};
});

export const unwrapDocSnapshotChanges = (action: Action<DocumentSnapshot>) => {
  const data = action.payload.data();
  const id = action.payload.id;
  return {id, ...data};
};
