import React, { FC } from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Spending from './transactions/Spending';
import SignIn from './components/SignIn';
import { CircularProgress } from '@material-ui/core';
import useAuth from './hooks/useAuth';
import Saving from './transactions/Saving';

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
        <>
            <Switch>
                <Route path="/sign-in" component={SignIn} />
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute path="/spending" component={Spending} />
                <PrivateRoute path="/savings" component={Saving} />
            </Switch>
        </>
    );
};

export default Routes;
