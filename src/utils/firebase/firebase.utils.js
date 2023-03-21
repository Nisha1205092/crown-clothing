// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc, 
    collection, 
    writeBatch,
    getDocs,
    query
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCFzjDEBfof0wUkkua0weBqGYIt_0zcV58",
    authDomain: "crown-clothing-db-ab56b.firebaseapp.com",
    projectId: "crown-clothing-db-ab56b",
    storageBucket: "crown-clothing-db-ab56b.appspot.com",
    messagingSenderId: "931947389244",
    appId: "1:931947389244:web:355728bd327c773afe7e39",
    measurementId: "G-RNCJQL0X87"
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => {
    signInWithRedirect(auth, googleProvider);
}
export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    
    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
    // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    //     const { title, items } = docSnapshot.data();
    //     acc[title.toLowerCase()] = items;
    //     return acc;
    // }, {});
    // return categoryMap;
    
    /*
    [
        {
            items: [
                {
                    id: 1, 
                    imageUrl: '...',
                    price: 18,
                    name: '..'
                },
                {..}, 
                {..}
            ],
            title: 'hats'
        }, 
        {..},
        {..},
        {..}
    ]
    */
    
}

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
    if (!userAuth) {
        console.log('userAuth does not exist!');
        return;
    }
    const userDocRef = doc(db, 'userAuth', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            });
            console.log('creating user account!!');
        } catch (error) {
            console.log('error creating the user ', error.message);
        }
    }
    return userSnapshot;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
        return;
    }
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const logInWithEmailAndPassword = async (email, password) => {
    try {
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        switch (error.code) {
            case 'auth/user-not-found':
                alert('Email not found!');
                break;
            case 'auth/wrong-password':
                alert('Password does not match!');
                break;
            default:
                console.log(error.message);
        }
    }
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
    onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject //deprecated third arg
        );
    })
}