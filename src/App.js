import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Routes from './routes';
import history from './services/history';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Routes history={history} />
      <ToastContainer newestOnTop={false} rtl={false} pauseOnVisibilityChange />
    </BrowserRouter>
  );
}

export default App;
