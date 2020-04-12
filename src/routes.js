import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import NavbarDashBoard from './components/NavbarDashboard';
import Activitys from './pages/Activitys';
import AllNewActivitys from './pages/AllNewActivitys';
import Dashboard from './pages/Dashboard';
import ListHomeWork from './pages/ListHomeWorks';
import Main from './pages/Main';
import Profile from './pages/Profile';
import Schools from './pages/Schools';
import SendSchoolWork from './pages/SendSchoolWork';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SignUpTeacher from './pages/SignUpTeacher';
import Teachers from './pages/Teachers';
import TeachersList from './pages/TeachersList';
import TeachersEdit from './pages/TeachersEdit';
import UploadFiles from './pages/UploadFiles';
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
      <Route
        path="/519daddbf53eed37a4d8705b5d32c81d"
        component={SignUpTeacher}
      />

      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/activitys" component={Activitys} />
      <PrivateRoute path="/all-new-activitys" component={AllNewActivitys} />
      <PrivateRoute path="/send-school-work" component={SendSchoolWork} />
      <PrivateRoute path="/upload-files" component={UploadFiles} />
      <PrivateRoute path="/list-home-work" component={ListHomeWork} />
      <PrivateRoute path="/teachers" component={Teachers} />
      <PrivateRoute path="/teachers-list" component={TeachersList} />
      <PrivateRoute path="/teacher-edit" component={TeachersEdit} />
      <PrivateRoute path="/schools" component={Schools} />
      <PrivateRoute path="/profile" component={Profile} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
