// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiUrl: "http://111.118.252.170:8787/api/buyer/",
  // apiBaseUrl: 'http://111.118.252.170:8787',
  apiUrl: "https://localhost:44310/api/buyer/",
  apiBaseUrl: "https://localhost:44310",
  //   apiUrl: "http://111.118.252.170:8787/api/buyer/",
  // apiBaseUrl: 'http://111.118.252.170:8787',
  // defaultUrl: 'ui/seller',
  // apiUrl: "https://skdirectseller.shopkirana.in/api/buyer/",
  // apiBaseUrl: 'https://skdirectseller.shopkirana.in',
  port: '',
  sellerAppUrl: 'http://skdirectseller.shopkirana.in:4040',
  sellerAppShareUrl: 'http://skdirectseller.shopkirana.in:4040',
  defaultUrl: '/ui/app-home/1',
  // apiUrl: "http://192.168.1.101:8787/api/buyer/",
  // apiBaseUrl: 'http://192.168.1.101:8787'
  systemPath: 'C:/d/SkDirectBuyerAppRepo/trunk/buyerAppUniversal',
  firebase:{
    apiKey: "AIzaSyCHx3ZTzXTSsySltSRc9jC-uMgRNVxQuUE",
    authDomain: "firestore-9c297.firebaseapp.com",
    databaseURL: "https://firestore-9c297.firebaseio.com",
    projectId: "firestore-9c297",
    storageBucket: "firestore-9c297.appspot.com",
    messagingSenderId: "308970045294",
    appId: "1:308970045294:web:ea85292fc9902f26644b7f"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
