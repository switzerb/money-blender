import { useEffect, useState } from 'react';
import { firebase } from '../config/firebase';
import 'firebase/auth';
import { AppUser, Auth } from '../types';

export default function useProvideAuth(): Auth {
    const [user, setUser] = useState(null as AppUser | null);

    const authenticated: boolean = user !== null;

    const signIn = (cb: () => void): void => {
        firebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((credentials: firebase.auth.UserCredential) => {
                if (!credentials || !credentials.user) {
                    throw new Error('No valid credentials for this user');
                }
                setUser({
                    displayName: credentials.user.displayName,
                    email: credentials.user.email,
                    photoURL: null,
                    uid: credentials.user.uid,
                });
                cb();
            });
    };

    const signOut = (cb: () => void) => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                setUser(null);
                cb();
            });
    };

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((authed: firebase.User | null) => {
            if (authed !== null) {
                setUser({
                    displayName: authed.displayName,
                    email: authed.email,
                    photoURL: null,
                    uid: authed.uid,
                });
            }
        });
        return () => unsubscribe();
    }, []);

    return { user, signIn, signOut, authenticated };
}
