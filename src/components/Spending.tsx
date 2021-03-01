import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useCollection } from '@nandorojo/swr-firestore';
import { useAuth } from '../hooks';
import { Transaction } from '../types';
import { Fab, Paper, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import TransactionsTable from './TransactionsTable';
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

const Spending: FC = () => {
    const classes = useStyles();
    const { user } = useAuth();
    const [open, setOpen] = React.useState<boolean>(false);
    const { data: spending } = useCollection<Transaction>(`users/${user?.uid}/spendings`, {
        parseDates: ['timestamp'],
        orderBy: ['timestamp', 'desc'],
        listen: true,
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // useEffect(() => {
    //     if (spendingsCollection) {
    //             docs.forEach((doc) => {
    //                 if (bucketRef) {
    //                     bucketRef
    //                         .get()
    //                         .then((bucket) => {
    //                             detail.bucket = bucket.data().name;
    //                             temp.push(detail);
    //                             temp.sort((a, b) => b.date - a.date);
    //                             dispatch({ type: 'getSpendings', payload: temp });
    //                         })
    //                         .catch((err) => console.error(err));
    //                 } else {
    //                 }
    //             });
    //         });
    //     }
    // }, [spendingsCollection]);

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
