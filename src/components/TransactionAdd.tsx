import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NumberFormat, { NumberFormatProps } from 'react-number-format';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
import { roundTo } from '../utils';
import { useAuth } from '../hooks';
import { useCollection } from '@nandorojo/swr-firestore';

// TODO: Validation on amount
// TODO: helpers on forms

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

interface NumberFormatCustomProps extends NumberFormatProps {
    inputRef: (instance: NumberFormat | null) => void;
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

function NumberFormatCustom(props: NumberFormatCustomProps) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                if (onChange) {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.value,
                        },
                    });
                }
            }}
            thousandSeparator
            isNumericString
            allowNegative
            prefix="$"
        />
    );
}

type Props = {
    open: boolean;
    onClose: () => void;
    account: string;
};

const TransactionAdd = ({ open, onClose, account }: Props): JSX.Element => {
    const classes = useStyles();
    const [description, setDescription] = useState('');
    const [type, setType] = useState('in');
    // const [bucket, setBucket] = React.useState(null);
    const [inflow, setInflow] = useState(0);
    const [outflow, setOutflow] = useState(0);
    const { user } = useAuth();
    // const { data: buckets } = useCollection(`users/${user?.uid}/buckets`);
    const { add: addSpend } = useCollection(`users/${user?.uid}/spendings`);
    const { add: addSave } = useCollection(`users/${user?.uid}/savings`);

    const handleChangeType = (e: React.SyntheticEvent, newType: string) => {
        setType(newType);
        if (type === 'in') {
            // setBucket('');
        }
    };

    const onTransactionAdd = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!description.trim().length) return;

        // TODO: Form validation and messaging

        const newTransaction = {
            description,
            outflow: roundTo(outflow, 2),
            inflow: roundTo(inflow, 2),
            timestamp: new Date(),
        };
        // if (bucket) {
        //     newTransaction.bucketRef = bucketsCollection.doc(bucket);
        // }

        if (account === 'spendings') {
            addSpend(newTransaction);
        }

        if (account === 'savings') {
            addSave(newTransaction);
        }
        onClose();
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} className={classes.root}>
                <DialogTitle id="form-dialog-title">Add New Transaction</DialogTitle>
                <DialogContent>
                    <ToggleButtonGroup value={type} exclusive color="secondary" onChange={handleChangeType}>
                        <ToggleButton value="in">PUT MONEY IN</ToggleButton>
                        <ToggleButton value="out">TAKE MONEY OUT</ToggleButton>
                    </ToggleButtonGroup>
                    <TextField
                        margin="normal"
                        autoFocus
                        placeholder={type === 'out' ? 'Describe what you bought' : 'How did you earn money?'}
                        id="description"
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                    {type === 'in' ? (
                        <TextField
                            margin="normal"
                            placeholder="How much?"
                            id="inflow"
                            label="Earned"
                            value={inflow}
                            onChange={(e) => setInflow(parseFloat(e.target.value))}
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                inputComponent: NumberFormatCustom as never,
                            }}
                        />
                    ) : (
                        <>
                            <TextField
                                margin="normal"
                                placeholder="How much?"
                                id="amount"
                                label="Spent"
                                value={outflow}
                                onChange={(e) => setOutflow(parseFloat(e.target.value))}
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    inputComponent: NumberFormatCustom as never,
                                }}
                            />
                            {/* <FormControl margin="normal" className={classes.form} variant="outlined"> */}
                            {/*    <InputLabel id="demo-simple-select-label">Bucket</InputLabel> */}
                            {/*    <Select fullWidth value={bucket} onChange={(e) => setBucket(e.target.value)}> */}
                            {/*        { */}
                            {/*            if(buckets) { */}
                            {/*                buckets.map((bucket) => (<MenuItem value={bucket.id}>{bucket.name}</MenuItem>)) */}
                            {/*            } */}
                            {/*        } */}
                            {/*    </Select> */}
                            {/* </FormControl> */}
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={onTransactionAdd} color="secondary">
                        Add Transaction
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TransactionAdd;
