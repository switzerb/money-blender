import React, { useEffect, useState } from 'react';
import 'firebase/auth';
import { firebase } from './firebase';

interface AppUser {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    uid: string;
}

type AuthProps = {
    user: AppUser | null;
    authenticated: boolean;
    loadingAuthState: boolean;
    logout: () => void;
};

type ProviderProps = {
    children: React.ReactNode;
};

const AuthContext = React.createContext<Partial<AuthProps>>({});

const AuthProvider: React.FC<ProviderProps> = ({ children }: ProviderProps) => {
    const [user, setUser] = useState(null as AppUser | null);
    const [loadingAuthState, setLoadingAuthState] = useState(true);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((authed: firebase.User | null) => {
            if (authed !== null) {
                setUser({
                    displayName: authed.displayName,
                    email: authed.email,
                    photoURL: null,
                    uid: authed.uid,
                });
                setLoadingAuthState(false);
            }
        });
    }, []);
    return (
        <AuthContext.Provider
            value={{
                user,
                authenticated: user !== null,
                loadingAuthState,
                logout: () => {
                    firebase
                        .auth()
                        .signOut()
                        .then((res) => {
                            console.log(res);
                            debugger;
                        });
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
