import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyAhAM-BEWYT456EsKJOmk97ejPdla7ewUg',
  authDomain: 'decel-machado.firebaseapp.com',
  databaseURL: 'https://decel-machado.firebaseio.com',
  projectId: 'decel-machado',
  storageBucket: 'decel-machado.appspot.com',
  messagingSenderId: '886097443844',
  appId: '1:886097443844:web:b64eecadadbf20391b8951',
  measurementId: 'G-LNYPDR0E44',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
