import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBkAwlntHNFlt_bfl_2KCSV6Al7c63kTgY',
    authDomain: 'bender-13a85.firebaseapp.com',
    databaseURL: 'https://bender-13a85.firebaseio.com',
    projectId: 'bender-13a85',
    storageBucket: 'bender-13a85.appspot.com',
    messagingSenderId: '445494690576',
    appId: '1:445494690576:web:b0c65cca6520099b4f9b95',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// const db = firebase.firestore();
//
// db.enablePersistence({ synchronizeTabs: true }).catch((err: Error) => console.error(err));

export { firebaseConfig, firebase };
