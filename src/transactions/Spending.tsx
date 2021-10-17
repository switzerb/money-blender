import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Fab, Paper, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import TransactionsTable from './TransactionsTable';
import TransactionAdd from './TransactionAdd';
import { AccountType, Transaction } from '../types/transactions';
import useTransactions from '../hooks/useTransactions';
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
    const { data: spending } = useTransactions<Transaction>(AccountType.SPENDING);

    const transactions = selectTransactions(spending);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    if (!transactions) return <div>Loading...</div>;

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Typography variant="h4">Checking</Typography>
                <TransactionsTable transactions={transactions} type={AccountType.SPENDING} />
                <Fab color="secondary" aria-label="add" className={classes.fab} onClick={handleClickOpen}>
                    <Add />
                </Fab>
            </Paper>
            <TransactionAdd account={AccountType.SPENDING} open={open} onClose={handleClose} />
        </div>
    );
};

export default Spending;
