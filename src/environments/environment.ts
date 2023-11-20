// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Initialize Firebase

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyDIyGBlOGvZU2dp8VL4XDQZKzbo6o25BQw',
    authDomain: 'iw20233u4estrada-ce799.firebaseapp.com',
    projectId: 'iw20233u4estrada-ce799',
    storageBucket: 'iw20233u4estrada-ce799.appspot.com',
    messagingSenderId: '751911580579',
    appId: '1:751911580579:web:6a9ef0a1e3902a15502016',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
