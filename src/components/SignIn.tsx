import React, { FC } from 'react';
import { Avatar, Box, Button, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LockOutlined } from '@material-ui/icons';
import { firebase } from '../providers/firebase';

const signInWithGoogle = () => {
    return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
};

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

    return (
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
                To log in, you will need to use a Google account. This is software made for kids so you can track what
                you earn and what you spend.
            </Typography>
            <Button
                className={classes.button}
                color="secondary"
                fullWidth
                variant="contained"
                size="large"
                onClick={() => signInWithGoogle()}
            >
                Sign In
            </Button>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Paper>
    );
};

export default SignIn;
