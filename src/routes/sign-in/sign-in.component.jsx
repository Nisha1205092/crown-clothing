import { 
    signInWithGooglePopup, 
    createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/signup form/signup-form.component";

const SignIn = () => {
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
            <SignUpForm />
        </div>
    );
}

export default SignIn;