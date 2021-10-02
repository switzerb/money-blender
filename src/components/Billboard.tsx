import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemSecondaryAction, ListItemText, Paper, Typography } from '@material-ui/core';
import { getSavings, getSpending, getTotals } from '../utils';
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

    const saveTotal = savings || [];
    const spendTotal = spending || [];

    return (
        <Paper className={classes.paper}>
            <Typography variant="h4">Total Money</Typography>
            <Typography variant="overline">On {new Date(Date.now()).toLocaleString()}</Typography>
            <Typography variant="h1">${getTotals(saveTotal, spendTotal)}</Typography>
            <List>
                <ListItem>
                    <ListItemText primary="Savings Total" />
                    <ListItemSecondaryAction>
                        <Typography variant="h4">${getSavings(saveTotal)}</Typography>
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                    <ListItemText primary="Spendable Total" />
                    <ListItemSecondaryAction>
                        <Typography variant="h4">${getSpending(spendTotal)}</Typography>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        </Paper>
    );
};

export default Billboard;
