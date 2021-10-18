import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCUSsqIBq-yP72a3mYyCAhkFbMoKBlTQbM',
    authDomain: 'money-blender-bf6f8.firebaseapp.com',
    databaseURL: 'https://money-blender-bf6f8.firebaseio.com',
    projectId: 'money-blender-bf6f8',
    storageBucket: 'money-blender-bf6f8.appspot.com',
    messagingSenderId: '372394001654',
    appId: '1:372394001654:web:519360d605aeb968e8d8d7',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

// db.enablePersistence({ synchronizeTabs: true }).catch((err: Error) => console.error(err));

export { db, firebaseConfig, firebase };
