// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyACNXXIaypsdkzXarU4j_dEajpkgVez_wc',
    authDomain: 'money-keeper-pwa.firebaseapp.com',
    databaseURL: 'https://money-keeper-pwa.firebaseio.com',
    projectId: 'money-keeper-pwa',
    storageBucket: 'money-keeper-pwa.appspot.com',
    messagingSenderId: '931375082243'
  }
};
