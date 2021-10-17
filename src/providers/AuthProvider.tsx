import React from 'react';
import { Auth } from '../types';
import useProvideAuth from '../hooks/useProvideAuth';

type Props = {
    children: React.ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const AuthContext = React.createContext<Auth>(undefined!);

const AuthProvider: React.FC<Props> = ({ children }: Props) => {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
