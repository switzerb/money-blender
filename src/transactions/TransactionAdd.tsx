import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
import { useAuth } from '../hooks';
import { useCollection } from '@nandorojo/swr-firestore';
import TransactionForm from './TransactionForm';
import { AccountType, Transaction } from '../types/transactions';

// TODO: Validation on amount
// TODO: helpers on forms

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    form: {
        width: '100%',
    },
    select: {
        padding: theme.spacing(2),
    },
}));

type Props = {
    open: boolean;
    onClose: () => void;
    account: AccountType;
};

const TransactionAdd = ({ open, onClose, account }: Props): JSX.Element => {
    const classes = useStyles();
    const { user } = useAuth();
    // const { data: buckets } = useCollection(`users/${user?.uid}/buckets`);
    const { add: addSpend } = useCollection(`users/${user?.uid}/spendings`);
    const { add: addSave } = useCollection(`users/${user?.uid}/savings`);

    const onSave = (transaction: Transaction) => {
        console.log(transaction);
        if (account === AccountType.SPENDING) {
            addSpend(transaction);
        }

        if (account === AccountType.SAVING) {
            addSave(transaction);
        }
        onClose();
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} className={classes.root}>
                <DialogTitle id="form-dialog-title">Add New Transaction</DialogTitle>
                <DialogContent>
                    <TransactionForm onSave={onSave} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TransactionAdd;
