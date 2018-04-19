import * as firebase from 'firebase/app';
import DocumentReference = firebase.firestore.DocumentReference;


export interface Group {
  id?: string;
  name: string;
  photoURL?: string;
  isPersonal: boolean;
  roles: {
    [key:string]: 'owner' | 'write' | 'read'
  };
  defaultCurrency: DocumentReference;
  createdAt: Date;
}
