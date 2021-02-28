import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import AppHeader from './components/AppHeader';
import { Container, CssBaseline } from '@material-ui/core';

export const App: React.FC = () => {
    return (
        <>
            <CssBaseline />
            <Router>
                <AppHeader />
                <Container maxWidth="lg">
                    <Routes />
                </Container>
            </Router>
        </>
    );
};
export default App;
