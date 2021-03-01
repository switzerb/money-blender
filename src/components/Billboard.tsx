import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, List, ListItem, ListItemText, ListItemSecondaryAction, Typography } from '@material-ui/core';
import { getTotals, getSavings, getSpending } from '../utils';
import { useCollection } from '@nandorojo/swr-firestore';
import { Transaction } from '../types';
import { useAuth } from '../hooks';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        textAlign: 'center',
    },
}));

const Billboard: FC = () => {
    const classes = useStyles();
    const { user } = useAuth();
    const { data: spending } = useCollection<Transaction>(`users/${user?.uid}/spendings`, {
        parseDates: ['timestamp'],
        orderBy: ['timestamp', 'desc'],
        listen: true,
    });

    const { data: savings } = useCollection<Transaction>(`users/${user?.uid}/savings`, {
        parseDates: ['timestamp'],
        orderBy: ['timestamp', 'desc'],
        listen: true,
    });

    return (
        <Paper className={classes.paper}>
            <Typography variant="h4">Total Money</Typography>
            <Typography variant="overline">On {new Date(Date.now()).toLocaleString()}</Typography>
            <Typography variant="h1">${getTotals(savings, spending)}</Typography>
            <List>
                <ListItem>
                    <ListItemText primary="Savings Total" />
                    <ListItemSecondaryAction>
                        <Typography variant="h4">${getSavings(savings)}</Typography>
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                    <ListItemText primary="Spendable Total" />
                    <ListItemSecondaryAction>
                        <Typography variant="h4">${getSpending(spending)}</Typography>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        </Paper>
    );
};

export default Billboard;
