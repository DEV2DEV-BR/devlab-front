import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyDhb5Bhjlqy3lk66tZSa92CsANlAWxwHZQ",
  authDomain: "jacode-cursos.firebaseapp.com",
  databaseURL: "https://jacode-cursos.firebaseio.com",
  projectId: "jacode-cursos",
  storageBucket: "jacode-cursos.appspot.com",
  messagingSenderId: "376353742120",
  appId: "1:376353742120:web:f04fb63de7f05b386c441d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
