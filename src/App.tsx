import React from 'react';
import './App.css';
import Routes from './Routes';
import AppHeader from './components/AppHeader';
import { Container, CssBaseline } from '@material-ui/core';

export const App: React.FC = () => {
    return (
        <>
            <CssBaseline />
            <AppHeader />
            <Container maxWidth="lg">
                <Routes />
            </Container>
        </>
    );
};
export default App;
