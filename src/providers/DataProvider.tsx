import { FuegoProvider } from '@nandorojo/swr-firestore';
import React from 'react';
import { Fuego } from '../config/fuego';
import { firebaseConfig } from '../config/firebase';

type Props = {
    children: React.ReactNode;
};

const fuego = new Fuego(firebaseConfig);

const DataProvider: React.FC<Props> = ({ children }: Props) => {
    return <FuegoProvider fuego={fuego}>{children}</FuegoProvider>;
};

export default DataProvider;
