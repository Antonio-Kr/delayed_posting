import React, {Component, Suspense} from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {history} from '../redux/store';
import Fallback from '../components/common/fallback';

const HomePage = React.lazy(() => import('../pages/home'));
const LoginPage = React.lazy(() => import('../pages/AuthPages/LoginPage'));
const SignUpPage = React.lazy(() => import('../pages/AuthPages/SignUpPage/SignUpPage'));
const RecoveryPassword = React.lazy(() => import('../pages/AuthPages/ForgotPassword/ForgotPassword'));

export default class MainRouter extends Component {

    render() {
        return (
            <Router history={history}>
                <Suspense fallback={<Fallback/>}>
                    <Switch>
                        <Route path="/" exact component={HomePage}/>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/signup" component={SignUpPage}/>
                        <Route path="/recoverypass" component={RecoveryPassword}/>
                    </Switch>
                </Suspense>
            </Router>
        );
    }
}