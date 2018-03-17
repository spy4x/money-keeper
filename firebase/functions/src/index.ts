'use strict';

import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import UserInfo = admin.auth.UserInfo;


admin.initializeApp(functions.config().firebase);
const db = admin.firestore();


export const createDataStructureForNewUser = functions.auth.user()
    .onCreate(async event => {
        const user = event.data;
        const userPath = `users/${user.uid}`;
        const groupPath = `groups/${user.uid}`;
        const userRef = db.doc(userPath);
        const groupRef = db.doc(groupPath);
        const userProfile: Partial<UserInfo> = {
            displayName: user.displayName || user.email || null,
            email: user.email || null,
            photoURL: user.photoURL || null,
        };
        const group = {
            name: `${user.displayName}'s personal group`,
            isPersonal: true,
            roles: {
                [user.uid]: 'owner'
            }
        };
        console.log('Start creating structure for user', userProfile);
        console.log('Start creating group', group);
        const batch = db.batch();
        batch.set(userRef, userProfile);
        batch.set(groupRef, group);
        return batch
            .commit()
            .then(() => console.log('User and his personal group were created'))
            .catch(error => console.error('Creating User and his personal group failed. ' +
                'User profile:', userProfile,
                'Personal group:', group,
                'Error:', error));
    });
