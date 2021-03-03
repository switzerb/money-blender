import React, { useState } from 'react';
import { Fab, Table, TableRow, TableHead, TableCell, TableBody, Paper, Typography } from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
// import BucketAdd from './bucketAdd';
import { Bucket } from '../types';
import { useUserCollection } from '../hooks';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2, 2, 4),
        textAlign: 'center',
    },
    table: {
        marginBottom: theme.spacing(2),
    },
    edit: {
        wrap: 'no-wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
}));

const Buckets = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const { data: buckets, error } = useUserCollection<Bucket>('buckets');

    if (error) {
        throw new Error('There is a problem fetching data');
    }

    const handleClickOpen = () => {
        console.log(open);
        setOpen(true);
    };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    // const getBucketLeft = (id, budgeted) => {
    //     return budgeted - getBucketSpent(id);
    // };
    //
    // const getBucketSpent = (id) => {
    //     // get a lit of all the transactions that match this bucket id
    //     return budgets.filter((transaction) => transaction.bucketRef.id === id).reduce((a, n) => n.outflow + a, 0);
    // };

    return (
        <Paper className={classes.paper}>
            <Typography variant="h4">Buckets</Typography>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Bucket Name</TableCell>
                        <TableCell>Budgeted</TableCell>
                        <TableCell>Spent</TableCell>
                        <TableCell>Left</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {buckets &&
                        buckets.map((bucket) => {
                            return (
                                <TableRow key={bucket.id}>
                                    <TableCell>{bucket.name}</TableCell>
                                    <TableCell>{bucket.name}</TableCell>
                                    <TableCell>{bucket.name}</TableCell>
                                    <TableCell>{`$${bucket.budgeted} / every 4 weeks`}</TableCell>
                                    {/* <TableCell>{`$${getBucketSpent(bucket.id)}`}</TableCell> */}
                                    {/* <TableCell>{`$${getBucketLeft(bucket.id, bucket.budgeted)}`}</TableCell> */}
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
            {/* <BucketAdd open={open} onClose={handleClose} /> */}
            <Fab color="secondary" variant="extended" onClick={handleClickOpen}>
                <Add />
                New Monthly Bucket
            </Fab>
        </Paper>
    );
};

export default Buckets;
