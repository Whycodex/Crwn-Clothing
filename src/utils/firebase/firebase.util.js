import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCzRLOZmFF7aN_Nu2oX8TD_BduPsI2i_ds",
    authDomain: "crwn-clothing-db-1d1a3.firebaseapp.com",
    projectId: "crwn-clothing-db-1d1a3",
    storageBucket: "crwn-clothing-db-1d1a3.appspot.com",
    messagingSenderId: "44403607725",
    appId: "1:44403607725:web:5e9999a11298bacc92de24"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (
        userAuth,
        additionalInformation={}
    ) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        }
        catch (error) {
            console.log('error creating the user', error.message);
        }
    };

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email||!password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email||!password) return;
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);