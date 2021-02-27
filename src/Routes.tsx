import React, { FC, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SignIn from './components/SignIn';
import { AuthContext } from './providers/AuthProvider';

type PrivateRouteProps = {
    path?: string;
    exact?: boolean;
    component: React.ComponentType<any>;
};

const PrivateRoute: FC<PrivateRouteProps> = ({ component: RouteComponent, ...rest }: PrivateRouteProps) => {
    const { authenticated, loadingAuthState } = useContext(AuthContext);
    if (loadingAuthState) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }
    return (
        <Route
            {...rest}
            render={(routeProps) =>
                authenticated ? (
                    <RouteComponent {...routeProps} />
                ) : (
                    <Redirect to={{ pathname: '/auth/login', state: { prevPath: rest.path } }} />
                )
            }
        />
    );
};

const AppRoutes = () => {
    return (
        <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
    );
};

const AuthRoutes = () => {
    return (
        <Switch>
            <Route exact path="/sign-in" component={SignIn} />
        </Switch>
    );
};

const Routes: FC = () => {
    return (
        <Router>
            <Switch>
                <PrivateRoute exact path="/dashboard" component={AppRoutes} />
                <Route path="/sign-in" component={AuthRoutes} />
                <Redirect to="/sign-in" from="/" />
            </Switch>
        </Router>
    );
};

export default Routes;
