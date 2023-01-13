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
    GoogleAuthProvider 
} from 'firebase/auth';
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc
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
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
console.log('auth ', auth);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();
console.log('db ', db);
export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'userAuth', userAuth.uid);
    console.log('userDocRef ', userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log('userSnapShot ', userSnapshot);
    
    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, 
                email, 
                createdAt   
            });
        } catch(error) {
            console.log('error creating the user ', error.message);
        }
    }
    return userDocRef;
}