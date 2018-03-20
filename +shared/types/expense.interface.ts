import * as firebase from 'firebase/app';
import DocumentReference = firebase.firestore.DocumentReference;


export interface Expense {
  id?: string;
  value: number;
  currency: DocumentReference;
  category: DocumentReference;
  comment: string;
  createdAt: Date;
  createdBy?: DocumentReference;
  tags: {
    [key: string]: true
  }
}
