import firebase from 'firebase';

// var firebaseConfig = {
//   apiKey: 'AIzaSyAhAM-BEWYT456EsKJOmk97ejPdla7ewUg',
//   authDomain: 'decel-machado.firebaseapp.com',
//   databaseURL: 'https://decel-machado.firebaseio.com',
//   projectId: 'decel-machado',
//   storageBucket: 'decel-machado.appspot.com',
//   messagingSenderId: '886097443844',
//   appId: '1:886097443844:web:b64eecadadbf20391b8951',
//   measurementId: 'G-LNYPDR0E44',
// };

const firebaseConfig = {
  apiKey: 'AIzaSyAf9KW77qgtyOB0aTuzfN2x11Z5m0x2WQQ',
  authDomain: 'jacode-docs.firebaseapp.com',
  databaseURL: 'https://jacode-docs.firebaseio.com',
  projectId: 'jacode-docs',
  storageBucket: 'jacode-docs.appspot.com',
  messagingSenderId: '327166775050',
  appId: '1:327166775050:web:5f1f987a13f617fa98b4f3',
  measurementId: 'G-0T8BH86M6R',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
