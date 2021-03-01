import React, { FC } from 'react';
import { IconButton, TableRow, TableCell } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import NumberFormat from 'react-number-format';
import { Transaction } from '../types';
import { makeStyles } from '@material-ui/core/styles';
import { useDocument } from '@nandorojo/swr-firestore';
import { useAuth } from '../hooks';

const useStyles = makeStyles({
    root: {},
    outflow: {
        color: 'red',
    },
    inflow: {},
});

type Props = {
    transaction: Transaction;
    type: string;
};

const TransactionItem: FC<Props> = ({ transaction, type }: Props) => {
    const classes = useStyles();
    const { user } = useAuth();
    const { deleteDocument } = useDocument(`users/${user?.uid}/${type}/${transaction.id}`);

    const onTransactionDelete = (): void => {
        if (deleteDocument === null) return;
        deleteDocument()?.catch((e) => console.log(e));
    };

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
