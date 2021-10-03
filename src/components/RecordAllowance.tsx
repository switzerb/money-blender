import React, { FC } from 'react';
import { Transaction } from '../types/transactions';
import { Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { latestAllowanceRecord } from '../utils';
import { endOfWeek, isWithinInterval, startOfWeek } from 'date-fns';
import { useCollection } from '@nandorojo/swr-firestore';
import { useAuth } from '../hooks';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        textAlign: 'center',
    },
}));

type Props = {
    spending: Transaction[];
};

const RecordAllowance: FC<Props> = ({ spending }: Props) => {
    const classes = useStyles();
    const { user } = useAuth();
    const { add: addSpend } = useCollection(`users/${user?.uid}/spendings`);
    const { add: addSave } = useCollection(`users/${user?.uid}/savings`);

    const alreadyRecorded = () => {
        const start = startOfWeek(Date.now());
        const end = endOfWeek(Date.now());
        const latest = latestAllowanceRecord(spending);
        return isWithinInterval(latest, { start, end });
    };

    const recordAllowance = () => {
        if (!alreadyRecorded()) {
            addSave({
                description: 'Weekly Allowance',
                inflow: 5.0,
                outflow: 0,
                timestamp: new Date(),
            });

            addSpend({
                description: 'Weekly Allowance',
                inflow: 5.0,
                outflow: 0,
                timestamp: new Date(),
            });
        }
    };

    return (
        <Paper className={classes.paper}>
            <Button
                disabled={alreadyRecorded()}
                variant="contained"
                color="secondary"
                size="large"
                onClick={recordAllowance}
            >
                {alreadyRecorded() ? 'Allowance Recorded!' : 'Record Weekly Allowance'}
            </Button>
        </Paper>
    );
};

export default RecordAllowance;
