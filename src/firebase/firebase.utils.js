import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBUw9qSVX7ANttrMRxDYaqlFSQZCqoY1SA',
  authDomain: 'crwn-db-14634.firebaseapp.com',
  projectId: 'crwn-db-14634',
  storageBucket: 'crwn-db-14634.appspot.com',
  messagingSenderId: '972263688170',
  appId: '1:972263688170:web:7766020e239977890d5493',
  measurementId: 'G-1219KRJ2K1',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return; // for handling signout

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
