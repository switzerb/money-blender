import React, { FC, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SignIn from './components/SignIn';
import { AuthContext } from './providers/AuthProvider';

type PrivateRouteProps = {
    path: string;
    exact?: boolean;
    component: React.FC<RouteComponentProps>;
};

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps): JSX.Element => {
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
            render={(props: RouteComponentProps) =>
                authenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/sign-in', state: { prevPath: rest.path } }} />
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
                <Redirect to="/dashboard" from="/" />
            </Switch>
        </Router>
    );
};

export default Routes;
