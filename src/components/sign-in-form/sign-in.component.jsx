import {
    useEffect
} from 'react';
import { getRedirectResult } from 'firebase/auth';
import { 
    auth,
    signInWithGooglePopup, 
    signInWithGoogleRedirect,
    createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../signup-form/signup-form.component";

const SignIn = () => {
    useEffect(() => {
        async function fetchData() {
          // You can await here
          const response = await getRedirectResult(auth);
          console.log(response);
          if(response) {
            const userDocRef = createUserDocumentFromAuth(response.user);
          }
          // ...
        }
        fetchData();
      }, []);
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        // console.log('logGoogleUser ', user);
        const userDocRef = createUserDocumentFromAuth(user);
        // console.log('userDocRef ', userDocRef);

    };

    return (
        <div>
            <h1>Sign in page</h1>
            <button onClick={logGoogleUser}>
                SignIn with Google Popup
            </button>
            <button onClick={signInWithGoogleRedirect}>
                SignIn with Google Redirect
            </button>
            <SignUpForm />
        </div>
    );
}

export default SignIn;