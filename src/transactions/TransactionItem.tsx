import React, { FC } from 'react';
import { IconButton, TableCell, TableRow } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import NumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';
import { useDocument } from '@nandorojo/swr-firestore';
import { useAuth } from '../hooks';
import { Transaction, TransactionType } from '../types/transactions';

const useStyles = makeStyles({
    root: {},
    outflow: {
        color: 'red',
    },
    inflow: {},
});

type Props = {
    transaction: Transaction;
    type: TransactionType;
};

const TransactionItem: FC<Props> = ({ transaction, type }: Props) => {
    const classes = useStyles();
    const { user } = useAuth();

    const transactionType = {
        [TransactionType.SAVING]: 'savings',
        [TransactionType.SPENDING]: 'spendings',
    }[type];

    const { deleteDocument } = useDocument(`users/${user?.uid}/${transactionType}/${transaction.id}`);

    const onTransactionDelete = (): void => {
        if (deleteDocument === null) return;
        deleteDocument()?.catch((e) => console.log(e));
    };

    console.log(transaction.timestamp);

    return (
        <TableRow key={transaction.id}>
            <TableCell>{transaction.timestamp.toLocaleString()}</TableCell>
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
            </TableCell>
        </TableRow>
    );
};

export default TransactionItem;
