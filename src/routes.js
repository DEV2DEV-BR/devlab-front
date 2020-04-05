import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Main from "./pages/Main";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Activitys from "./pages/Activitys";
import AllNewActivitys from "./pages/AllNewActivitys";
import SendSchoolWork from "./pages/SendSchoolWork";
import UploadFiles from "./pages/UploadFiles";
import NavbarDashBoard from "./components/NavbarDashboard";
import { istAuthenticated } from "./services/auth";

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
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
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
      <PrivateRoute path="/activitys" component={Activitys} />
      <PrivateRoute path="/all-new-activitys" component={AllNewActivitys} />
      <PrivateRoute path="/send-school-work" component={SendSchoolWork} />
      <PrivateRoute path="/upload-files" component={UploadFiles} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
