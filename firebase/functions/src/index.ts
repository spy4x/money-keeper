'use strict';

import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { User } from '@root/+shared/types/user.interface';
import { UserConfig } from '@root/+shared/types/userConfig.interface';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

export const createDataStructureForNewUser = functions.auth
  .user()
  .onCreate(async event => {
    const user = event.data;
    const userPath = `users/${user.uid}`;
    const groupPath = `groups/${user.uid}`;
    const userConfigPath = `usersConfigs/${user.uid}`;
    const defaultCurrencyId = 'rub';
    const defaultCurrencyPath = `currencies/${defaultCurrencyId}`;
    const userRef = db.doc(userPath);
    const defaultCurrencyRef = db.doc(defaultCurrencyPath);
    const groupRef = db.doc(groupPath);
    const userConfigRef = db.doc(userConfigPath);
    const userProfile: User = {
      displayName: user.displayName || user.email || null,
      email: user.email || null,
      photoURL: user.photoURL || null,
      createdAt: new Date(),
    };
    const group = {
      name: `${user.displayName}'s personal group`,
      isPersonal: true,
      roles: {
        [user.uid]: 'owner',
      },
      defaultCurrency: defaultCurrencyRef,
      createdAt: new Date(),
    };
    const userConfig: UserConfig = {
      activeGroupId: groupRef.id,
      defaultCurrencyId: defaultCurrencyId, // TODO: define currency based on user's country
    };
    const batch = db.batch();
    batch.set(userRef, userProfile);
    batch.set(groupRef, group);
    batch.set(userConfigRef, userConfig);
    return batch
      .commit()
      .then(() =>
        console.log(
          'User and his starting structure were created',
          '\nUser:',
          userProfile,
          '\nGroup:',
          group,
          '\nUserConfig:',
          userConfig,
        ),
      )
      .catch(error =>
        console.error(
          'Creating User and his starting structure failed. ' + 'User profile:',
          userProfile,
          'Personal group:',
          group,
          'User config:',
          userConfig,
          'Error:',
          error,
        ),
      );
  });
