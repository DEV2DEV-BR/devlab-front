import firebase from 'firebase';
import 'firebase/auth';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './services/api';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

firebase.analytics();
serviceWorker.unregister();
