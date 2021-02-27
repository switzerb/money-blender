import React from 'react';
import AuthProvider from './providers/AuthProvider';
import './App.css';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <>
                <p>Hello World</p>
            </>
        </AuthProvider>
    );
};

export default App;
