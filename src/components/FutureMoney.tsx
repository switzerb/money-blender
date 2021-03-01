import React, { useState, FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Slider, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        textAlign: 'center',
    },
}));

type Props = {
    savings: number;
    spending: number;
};

const FutureMoney: FC<Props> = ({ savings, spending }: Props) => {
    const classes = useStyles();
    const [weeks, setWeeks] = useState<number>(1);

    const handleChange = () => {
        setWeeks(1);
    };

    return (
        <Paper className={classes.paper}>
            <Typography variant="h4">Future Money</Typography>
            <p>You earn $10 every week, $5 to save, $5 to spend.</p>
            <Typography variant="h6">{`How much will I have in...${weeks} week${weeks !== 1 ? 's' : ''}?`}</Typography>
            <Slider onChange={handleChange} defaultValue={1} valueLabelDisplay="auto" step={1} marks min={1} max={48} />
            <Typography variant="h4">In Savings: {savings + weeks * 5}</Typography>
            <Typography variant="h4">In Spending: {spending + weeks * 5}</Typography>
            <Typography variant="h4">Total: {spending + savings + weeks * 10}</Typography>
        </Paper>
    );
};

export default FutureMoney;
