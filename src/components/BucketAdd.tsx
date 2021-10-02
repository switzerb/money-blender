import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, FormControl, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { roundTo } from '../utils';
import { useUserCollection } from '../hooks';
import { Transaction } from '../types';

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
    btn: {
        margin: theme.spacing(2, 1),
    },
    textfield: {
        margin: theme.spacing(1, 0),
    },
}));

const BucketAdd: React.FC<{
    open: boolean;
    onClose: () => void;
}> = ({ open, onClose }): JSX.Element => {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [errName, setErrName] = useState(false);
    const [errBudgeted, setErrBudgeted] = useState(false);
    const [budgeted, setBudgeted] = useState(0);
    const { data: buckets, add: addBucket } = useUserCollection<Transaction>('buckets');

    const invalidName = (name: string) => {
        if (!name.trim().length) {
            setErrName(true);
            return true;
        }
        setErrName(false);
        return false;
    };

    const isInvalidBudget = (budgeted: number) => {
        if (isNaN(budgeted)) {
            setErrBudgeted(true);
            return true;
        }
        setErrBudgeted(false);
        return false;
    };

    const onBucketAdd = () => {
        if (invalidName(name)) return;
        if (isInvalidBudget(budgeted)) return;

        const newBucket = {
            name,
            budgeted: roundTo(budgeted, 2),
        };
        addBucket(newBucket);
        onClose();
    };

    return (
        <>
            <Dialog fullWidth open={open} onClose={onClose} className={classes.root}>
                <DialogTitle id="form-dialog-title">Add New Budgeting Bucket</DialogTitle>
                <DialogContent>
                    <FormControl className={classes.form} variant="outlined">
                        <TextField
                            className={classes.textfield}
                            label="Bucket Name"
                            error={errName}
                            helperText={errName ? "Name can't be empty" : 'Describe the bucket'}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            className={classes.textfield}
                            label="How Much?"
                            error={errBudgeted}
                            helperText={errBudgeted ? 'Must be a number' : 'budget every four weeks'}
                            onChange={(e) => setBudgeted(e.target.value)}
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                        />
                    </FormControl>
                    <Button className={classes.btn} variant="contained" color="secondary" onClick={() => onBucketAdd()}>
                        Save
                    </Button>
                    <Button className={classes.btn} variant="contained" onClick={onClose}>
                        Cancel
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default BucketAdd;
