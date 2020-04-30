import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import NavbarDashBoard from './components/NavbarDashboard';
import Dashboard from './pages/Dashboard';
import Main from './pages/Main';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import CoursesDetails from './pages/CoursesDetails';
import ClassesByCourse from './pages/ClassesByCourse';
import CreateCourse from './pages/CreateCourse';
import UploadClasses from './pages/UploadClasses';
import WatchClasse from './pages/WatchClasse';
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
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/course-details" component={CoursesDetails} />

      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/create-course" component={CreateCourse} />
      <PrivateRoute path="/add-classes" component={UploadClasses} />
      <PrivateRoute path="/classes-by-course" component={ClassesByCourse} />
      <PrivateRoute path="/watch-classe" component={WatchClasse} />
      <PrivateRoute path="/profile" component={Profile} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
