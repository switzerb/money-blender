import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { AccountType, Transaction } from '../types/transactions';
import { getSavings, getSpending } from '../utils';
import RecordAllowance from './RecordAllowance';
import Billboard from './Billboard';
import FutureMoney from './FutureMoney';
import Buckets from './Buckets';
import useTransactions from '../hooks/useTransactions';

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
    const { data: spending } = useTransactions<Transaction>(AccountType.SPENDING);
    const { data: saving } = useTransactions<Transaction>(AccountType.SAVING);

    const saveTotal = saving || [];
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
