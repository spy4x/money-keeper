import * as firebase from 'firebase/app';
import DocumentReference = firebase.firestore.DocumentReference;


export interface Category {
  id?: string;
  name: string;
  icon: string;
  createdAt: Date;
  createdBy: DocumentReference;
}
