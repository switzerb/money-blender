import React, { useEffect, useState } from 'react';
import 'firebase/auth';
import { firebase } from './firebase';

type ContextProps = {
    user: firebase.User | null;
    authenticated: boolean;
    loadingAuthState: boolean;
};

type ProviderProps = {
    children: React.ReactNode;
};

const AuthContext = React.createContext<Partial<ContextProps>>({});

const AuthProvider: React.FC<ProviderProps> = ({ children }: ProviderProps) => {
    const [user, setUser] = useState(null as firebase.User | null);
    const [loadingAuthState, setLoadingAuthState] = useState(true);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
            setUser(user);
            setLoadingAuthState(false);
        });
    }, []);
    return (
        <AuthContext.Provider
            value={{
                user,
                authenticated: user !== null,
                loadingAuthState,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
