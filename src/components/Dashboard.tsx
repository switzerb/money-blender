import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { useAuth } from '../hooks';
import { useCollection } from '@nandorojo/swr-firestore';
import { Transaction } from '../types';
import { getSavings, getSpending } from '../utils';
import RecordAllowance from './RecordAllowance';
import Billboard from './Billboard';
// import Buckets from './Buckets';
import FutureMoney from './FutureMoney';
import Buckets from './Buckets';

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

const Dashboard: FC = () => {
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
        <Grid container spacing={2} className={classes.root}>
            <Grid item xs={6}>
                <Billboard />
                <Buckets />
            </Grid>
            <Grid item xs={6}>
                <RecordAllowance spending={spending as Transaction[]} />
                <FutureMoney savings={getSavings(saveTotal)} spending={getSpending(spendTotal)} />
            </Grid>
        </Grid>
    );
};

export default Dashboard;
