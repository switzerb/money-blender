import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar, Box, Button, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LockOutlined } from '@material-ui/icons';
import useAuth from '../hooks/useAuth';

const Copyright: FC = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © Money Blender '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(8),
        padding: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    text: {
        margin: theme.spacing(2, 0),
    },
    button: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignIn: FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const auth = useAuth();

    const login = () => {
        auth.signIn(() => {
            history.replace('/dashboard');
        });
    };
    return (
        <>
            <Paper className={classes.root} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Typography className={classes.text} variant="h3">
                    Welcome to Bender!
                </Typography>
                <Typography variant="h6">
                    To log in, you will need to use a Google account. This is software made for kids so you can track
                    what you earn and what you spend.
                </Typography>
                <Button
                    className={classes.button}
                    color="secondary"
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={login}
                >
                    Sign In
                </Button>
                <Box mt={8}>
                    <Copyright />
                </Box>
                {}
            </Paper>
        </>
    );
};

export default SignIn;
