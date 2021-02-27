import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from '../config/firebase';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

db.enablePersistence({ synchronizeTabs: true }).catch((err: Error) => console.error(err));

export { firebase, db };
