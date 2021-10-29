import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import NavbarDashBoard from './components/NavbarDashboard';
import ClassesByCourse from './pages/ClassesByCourse';
import CreateCourse from './pages/CreateCourse';
import Dashboard from './pages/Dashboard';
import MyCourses from './pages/MyCourses';
import MyStudents from './pages/MyStudents';
import Profile from './pages/Profile';
import RegisterCourse from './pages/RegisterCourse';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
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
        <Redirect
          to={{ pathname: '/sign-in', state: { from: props.location } }}
        />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path={["/","/sign-in"]} exact component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/profile" component={Profile} />
      <PrivateRoute path="/create-course" component={CreateCourse} />
      <PrivateRoute path="/add-classes" component={UploadClasses} />
      <PrivateRoute path="/classes-by-course" component={ClassesByCourse} />
      <PrivateRoute path="/watch-classe" component={WatchClasse} />
      <PrivateRoute path="/register-course" component={RegisterCourse} />
      <PrivateRoute path="/list-my-courses" component={MyCourses} />
      <PrivateRoute path="/list-my-students" component={MyStudents} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
