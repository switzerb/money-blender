import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider, DataProvider, StoreProvider } from './providers';
import theme from './theme';
import { ThemeProvider } from '@material-ui/core/styles';

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <DataProvider>
                <StoreProvider>
                    <ThemeProvider theme={theme}>
                        <App />
                    </ThemeProvider>
                </StoreProvider>
            </DataProvider>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
