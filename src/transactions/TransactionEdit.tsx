import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { AccountType, Transaction } from '../types/transactions';
import TransactionForm from './TransactionForm';
import { makeStyles } from '@material-ui/core/styles';
import useTransaction from '../hooks/useTransaction';

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
    account: AccountType;
    transaction: Transaction;
    open: boolean;
    onClose: () => void;
};

const TransactionEdit = ({ account, transaction, open, onClose }: Props): JSX.Element => {
    const classes = useStyles();

    if (!transaction || !transaction.id) {
        return <div>We can't find that transaction to edit.</div>;
    }

    const { update } = useTransaction(transaction.id, account);

    const onSave = (transaction: Transaction) => {
        update({
            description: transaction.description,
            inflow: transaction.inflow,
            outflow: transaction.outflow,
            bucketRef: transaction.bucketRef,
        });
        onClose();
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} className={classes.root}>
                <DialogTitle id="form-dialog-title">Edit Transaction</DialogTitle>
                <DialogContent>
                    <TransactionForm transaction={transaction} onSave={onSave} />
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

export default TransactionEdit;
