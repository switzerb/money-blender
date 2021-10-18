import * as React from 'react';
import { useState } from 'react';
import { Transaction, TransactionType } from '../types/transactions';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import NumberFormat, { NumberFormatProps } from 'react-number-format';
import firebase from 'firebase';
import { useAuth, useUserCollection } from '../hooks';
import { Bucket } from '../types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    form: {
        width: '100%',
    },
});

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
    transaction?: Transaction;
    onSave: (transaction: Transaction) => void;
};

const TransactionForm = ({ transaction, onSave }: Props): JSX.Element => {
    const classes = useStyles();
    const [description, setDescription] = useState(transaction?.description || '');
    const [type, setType] = useState(transaction?.type || TransactionType.MONEY_IN);
    const [bucket, setBucket] = React.useState('');
    const [inflow, setInflow] = useState(transaction?.inflow || 0);
    const [outflow, setOutflow] = useState(transaction?.outflow || 0);
    const { data: buckets } = useUserCollection<Bucket>('buckets');
    const { user } = useAuth();
    const currentUser = user?.uid || null;

    const handleChangeType = (e: React.SyntheticEvent, newType: TransactionType) => {
        setType(newType);
        if (type === TransactionType.MONEY_IN) {
            setBucket('');
        }
    };

    const handleSetBucket = (event: React.ChangeEvent<{ value: string | unknown }>) => {
        setBucket(event.target.value as string);
    };

    const handleSave = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!description.trim().length) return;
        // TODO: Form validation and messaging

        const newTransaction: Transaction = {
            description,
            outflow: outflow,
            inflow: inflow,
            timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        };

        if (bucket) {
            newTransaction.bucketRef = firebase.firestore().doc(`users/${currentUser}/buckets/${bucket}`);
        }
        onSave(newTransaction);
    };

    return (
        <>
            <ToggleButtonGroup value={type} exclusive color="secondary" onChange={handleChangeType}>
                <ToggleButton value="in">PUT MONEY IN</ToggleButton>
                <ToggleButton value="out">TAKE MONEY OUT</ToggleButton>
            </ToggleButtonGroup>
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
                    <FormControl margin="normal" variant="outlined" className={classes.form}>
                        <InputLabel id="demo-simple-select-label">Bucket</InputLabel>
                        <Select fullWidth value={bucket} onChange={handleSetBucket}>
                            {buckets?.map((bucket) => (
                                <MenuItem value={bucket.id}>{bucket.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </>
            )}
            <TextField
                margin="normal"
                autoFocus
                placeholder={
                    type === TransactionType.MONEY_OUT ? 'Describe what you bought' : 'How did you earn money?'
                }
                id="description"
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                variant="outlined"
            />
            <Button onClick={handleSave} color="secondary">
                Save
            </Button>
        </>
    );
};

export default TransactionForm;
