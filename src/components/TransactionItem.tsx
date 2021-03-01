import React, { FC } from 'react';
import { IconButton, TableRow, TableCell } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import NumberFormat from 'react-number-format';
import { Transaction } from '../types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {},
    outflow: {
        color: 'red',
    },
    inflow: {},
}));

type Props = {
    transaction: Transaction;
    type: string;
};

const TransactionItem: FC<Props> = ({ transaction, type }: Props) => {
    const classes = useStyles();
    // const { spendingsCollection, savingsCollection } = useContext(DataContext);

    const onTransactionDelete = (id: string): void => {
        console.log(id);
        if (type === 'spendings') {
            // spendingsCollection
            //     .doc(id)
            //     .delete()
            //     .catch((e) => {
            //         console.log(e);
            //     });
        }
        if (type === 'savings') {
            // savingsCollection
            //     .doc(id)
            //     .delete()
            //     .catch((e) => {
            //         console.log(e);
            //     });
        }
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
                <IconButton onClick={() => onTransactionDelete(transaction.id)}>
                    <Delete />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default TransactionItem;
