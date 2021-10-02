import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useUserCollection } from '../hooks';
import { Bucket, Transaction } from '../types';
import { Fab, Paper, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import TransactionsTable from '../components/TransactionsTable';
import TransactionAdd from '../components/TransactionAdd';
import { selectTransactions } from './selector';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        position: 'relative',
        margin: theme.spacing(2),
        padding: theme.spacing(2, 2, 10),
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

const Spending: FC = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState<boolean>(false);
    const { data: spendTransactions } = useUserCollection<Transaction>('spendings');
    const { data: buckets } = useUserCollection<Bucket>('buckets');

    const spending = selectTransactions(spendTransactions, buckets);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    if (!spending) return <div>Loading...</div>;

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Typography variant="h4">Transactions</Typography>
                <TransactionsTable transactions={spending} type="spendings" />
                <Fab color="secondary" aria-label="add" className={classes.fab} onClick={handleClickOpen}>
                    <Add />
                </Fab>
            </Paper>
            <TransactionAdd account="spendings" open={open} onClose={handleClose} />
        </div>
    );
};

export default Spending;