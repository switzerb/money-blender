import * as React from 'react';
import { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import { Transaction, TransactionType } from '../types/transactions';
import TransactionsTable from './TransactionsTable';
import useTransactions from '../hooks/useTransactions';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        position: 'relative',
        margin: theme.spacing(2),
        padding: theme.spacing(2, 2, 10),
    },
}));

const Saving: FC = () => {
    const classes = useStyles();
    const { data: saving } = useTransactions<Transaction>(TransactionType.SAVING);

    if (!saving) return <div>Loading...</div>;

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Typography variant="h4">Saving</Typography>
                <TransactionsTable transactions={saving} type={TransactionType.SAVING} />
            </Paper>
        </div>
    );
};

export default Saving;
