import * as firebase from 'firebase/app';
import DocumentReference = firebase.firestore.DocumentReference;


export interface Tag {
  id?: string;
  name: string;
  color: string;
  createdAt?: Date;
  createdBy?: DocumentReference;
}
