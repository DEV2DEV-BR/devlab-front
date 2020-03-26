import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Main from './pages/Main'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Activitys from './pages/Activitys'
import UploadFiles from './pages/UploadFiles'

import { istAuthenticated } from './services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            istAuthenticated() ? (
                <Component {...props} />
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
            <PrivateRoute path="/activitys" component={Activitys} />
            <PrivateRoute path="/upload-files" component={UploadFiles} />

        </Switch>
    </BrowserRouter>
);

export default Routes;

