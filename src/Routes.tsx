import React, { FC } from 'react';
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Spending from './components/Spending';
import SignIn from './components/SignIn';
import { CircularProgress } from '@material-ui/core';
import useAuth from './hooks/useAuth';

type PrivateRouteProps = {
    path: string;
    exact?: boolean;
    component: React.FC<RouteComponentProps>;
};

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps): JSX.Element => {
    const auth = useAuth();
    if (auth.loading) {
        return <CircularProgress />;
    }
    return (
        <Route
            {...rest}
            render={(props: RouteComponentProps) =>
                auth && auth.user ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/sign-in', state: { prevPath: rest.path } }} />
                )
            }
        />
    );
};

const Routes: FC = () => {
    return (
        <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute path="/spending" component={Spending} />
            <Route path="/sign-in" component={SignIn} />
        </Switch>
    );
};

export default Routes;
