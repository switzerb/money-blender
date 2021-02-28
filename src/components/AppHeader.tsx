import React, { useContext, FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { AuthContext } from '../providers/AuthProvider';
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
    const { user, logout } = useContext(AuthContext);

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
                    {user && (
                        <div>
                            Welcome, {user.displayName}
                            <Button onClick={logout}>Logout</Button>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            {/* {current_user && <Navigation />} */}
        </div>
    );
};

export default AppHeader;
