import { useEffect, useState } from 'react';
import { firebase } from '../providers/firebase';
import 'firebase/auth';
import { AppUser, Auth } from '../types/auth';

export default function useProvideAuth(): Auth {
    const [user, setUser] = useState(null as AppUser | null);

    const signIn = (cb: () => void): void => {
        firebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then(() => {
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

    return { user, signIn, signOut };
}
