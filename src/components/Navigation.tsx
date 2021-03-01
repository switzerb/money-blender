import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

const Navigation: FC = () => {
    const location = useLocation();
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Tabs value={location.pathname} indicatorColor="primary" textColor="primary" centered>
                <Tab label="Dashboard" component={Link} to="/" value="/" />
                <Tab label="Spending" component={Link} to="spending" value="/spending" />
                <Tab label="Savings" component={Link} to="savings" value="/savings" />
            </Tabs>
        </Paper>
    );
};
export default Navigation;
