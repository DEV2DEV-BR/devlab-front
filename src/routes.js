import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import NavbarDashBoard from './components/NavbarDashboard';
import ClassesByCourse from './pages/ClassesByCourse';
import CoursesDetails from './pages/CoursesDetails';
import CreateCourse from './pages/CreateCourse';
import Dashboard from './pages/Dashboard';
import Main from './pages/Main';
import MyCourses from './pages/MyCourses';
import Cart from './pages/Cart';
import MyStudents from './pages/MyStudents';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import UploadClasses from './pages/UploadClasses';
import RegisterCourse from './pages/RegisterCourse';
import Checkout from './pages/Checkout';
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
      <Route path="/" exact component={Main} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/course-details" component={CoursesDetails} />
      <Route path="/cart" component={Cart} />
      <PrivateRoute path="/checkout" component={Checkout} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/create-course" component={CreateCourse} />
      <PrivateRoute path="/add-classes" component={UploadClasses} />
      <PrivateRoute path="/classes-by-course" component={ClassesByCourse} />
      <PrivateRoute path="/watch-classe" component={WatchClasse} />
      <PrivateRoute path="/register-course" component={RegisterCourse} />
      <PrivateRoute path="/list-my-courses" component={MyCourses} />
      <PrivateRoute path="/list-my-students" component={MyStudents} />
      <PrivateRoute path="/profile" component={Profile} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
