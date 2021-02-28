import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useAuth from '../hooks/useAuth';
import { Link, useHistory } from 'react-router-dom';
// import Navigation from './Navigation';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontFamily: 'Alfa Slab One',
    },
    subtitle: {
        marginLeft: '20px',
    },
}));

const AppHeader: FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const auth = useAuth();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" className={classes.title}>
                        Money Blender
                        <Typography variant="overline" className={classes.subtitle}>
                            Personal finance for fun and profit!
                        </Typography>
                    </Typography>
                    {auth && auth.user && (
                        <div>
                            Welcome, {auth.user?.displayName}
                            <Button
                                onClick={() => {
                                    auth.signOut(() => history.push('/'));
                                }}
                            >
                                Sign out
                            </Button>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            {/* {current_user && <Navigation />} */}
            <ul>
                <ul>
                    <li>
                        <Link to="/">Public Page</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/spending">Spending</Link>
                    </li>
                </ul>
            </ul>
        </div>
    );
};

export default AppHeader;
