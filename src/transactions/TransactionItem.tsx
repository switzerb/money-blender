import React, { FC } from 'react';
import { IconButton, TableCell, TableRow } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import NumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';
import { AccountType, Transaction } from '../types/transactions';
import TransactionEdit from './TransactionEdit';
import useTransaction from '../hooks/useTransaction';
import firebase from 'firebase';

const useStyles = makeStyles({
    root: {},
    outflow: {
        color: 'red',
    },
    inflow: {},
});

type Props = {
    transaction: Transaction;
    type: AccountType;
};

const TransactionItem: FC<Props> = ({ transaction, type }: Props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState<boolean>(false);

    const handleClose = () => {
        setOpen(false);
    };

    // TODO: deal with lack of transaction id
    const { deleteDocument } = useTransaction(transaction.id || '', type);

    const onTransactionDelete = (): void => {
        deleteDocument();
    };

    const onTransactionEdit = (): void => {
        setOpen(true);
    };

    const transactionDate =
        transaction.timestamp instanceof firebase.firestore.Timestamp
            ? transaction.timestamp?.toDate().toLocaleDateString()
            : null;

    return (
        <>
            <TableRow key={transaction.id}>
                <TableCell>{transactionDate}</TableCell>
                <TableCell component="th" scope="row">
                    {transaction.description}
                </TableCell>
                <TableCell className={classes.inflow}>
                    {transaction.inflow > 0 ? (
                        <NumberFormat
                            value={transaction.inflow}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'$'}
                        />
                    ) : (
                        ''
                    )}
                </TableCell>
                <TableCell className={classes.outflow}>
                    {transaction.outflow > 0 ? (
                        <NumberFormat
                            value={transaction.outflow}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'- $'}
                        />
                    ) : (
                        ''
                    )}
                </TableCell>
                <TableCell>bucket here</TableCell>
                <TableCell>
                    <IconButton onClick={onTransactionDelete}>
                        <Delete />
                    </IconButton>
                    <IconButton onClick={onTransactionEdit}>
                        <Edit />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TransactionEdit account={type} transaction={transaction} open={open} onClose={handleClose} />
        </>
    );
};

export default TransactionItem;
