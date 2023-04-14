// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { Category } from "../../store/categories/category.types";
import { Auth, NextOrObserver, User } from "firebase/auth";
import { initializeApp, FirebaseError } from "firebase/app";
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
    query,
    QuerySnapshot,
    QueryDocumentSnapshot
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
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();
 
export type ObjectToAdd = {
    title: string;
}
// for populating firebase database with categories and products initially, unused now
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
    collectionKey: string, 
    objectsToAdd: T[]
    ): Promise<void> => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    
    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
}

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as Category);
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

export type AdditionalInfo = {
    displayName?: string;
};

export type UserData = {
    createdAt: Date;
    displayName: string;
    email: string;
}

export const createUserDocumentFromAuth = async (
    userAuth: User, 
    additionalInfo = {} as AdditionalInfo
    ): Promise<void | QueryDocumentSnapshot<UserData> > => {
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
                ...additionalInfo // in case of sign ups
            });
            console.log('creating user account!!');
        } catch (error) {
            console.log('error creating the user ', error);
        }
    }
    return userSnapshot as QueryDocumentSnapshot<UserData>;
}

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) {
        return;
    }
    return await createUserWithEmailAndPassword(auth, email, password);
}

///////////////////////////////////
// help from ChatGPT
interface FirebaseAuthError extends FirebaseError {
  code: string;
  message: string;
}
// Function to handle login with email and password
export const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    const firebaseError = error as FirebaseAuthError;
    switch (firebaseError.code) {
      case 'auth/user-not-found':
        alert('Email not found!');
        break;
      case 'auth/wrong-password':
        alert('Password does not match!');
        break;
      default:
        console.log(firebaseError.message);
    }
  }
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
    onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe(); // we want to close the listener to avoid memory leaks
                resolve(userAuth);
            },
            reject //deprecated third arg
        );
    })
}