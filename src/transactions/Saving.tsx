import * as React from 'react';
import { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Fab, Paper, Typography } from '@material-ui/core';
import { AccountType, Transaction } from '../types/transactions';
import TransactionsTable from './TransactionsTable';
import useTransactions from '../hooks/useTransactions';
import { Add } from '@material-ui/icons';
import TransactionAdd from './TransactionAdd';

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

const Saving: FC = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState<boolean>(false);
    const { data: saving } = useTransactions<Transaction>(AccountType.SAVING);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    if (!saving) return <div>Loading...</div>;

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Typography variant="h4">Saving</Typography>
                <TransactionsTable transactions={saving} type={AccountType.SAVING} />
                <Fab color="secondary" aria-label="add" className={classes.fab} onClick={handleClickOpen}>
                    <Add />
                </Fab>
                <TransactionAdd account={AccountType.SAVING} open={open} onClose={handleClose} />
            </Paper>
        </div>
    );
};

export default Saving;
