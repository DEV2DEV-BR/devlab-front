import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import NavbarDashBoard from './components/NavbarDashboard';
import Dashboard from './pages/Dashboard';
import Main from './pages/Main';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ClassesByCourse from './pages/ClassesByCourse';
import UploadClasses from './pages/UploadClasses';
import { istAuthenticated } from './services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      istAuthenticated() ? (
        <>
          <NavbarDashBoard {...props} />
          <Component {...props} />
        </>
      ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/signIn" component={SignIn} />
      <Route path="/signUp" component={SignUp} />

      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/add-classes" component={UploadClasses} />
      <PrivateRoute path="/classes-by-course" component={ClassesByCourse} />
      <PrivateRoute path="/profile" component={Profile} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
