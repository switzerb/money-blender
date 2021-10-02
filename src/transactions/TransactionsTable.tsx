import React, { FC } from 'react';
import { Transaction } from '../types';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TransactionItem from './TransactionItem';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

type Props = {
    transactions: Transaction[];
    type: string;
};

const TransactionsTable: FC<Props> = ({ transactions, type }: Props) => {
    const classes = useStyles();

    return transactions.length ? (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Earned</TableCell>
                        <TableCell>Spent</TableCell>
                        <TableCell>Bucket</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((transaction) => (
                        <TransactionItem key={transaction.id} transaction={transaction} type={type} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    ) : (
        <p>You do not have any transactions yet!</p>
    );
};

export default TransactionsTable;
