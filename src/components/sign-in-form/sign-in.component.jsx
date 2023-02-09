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
import FormInput from '../form-input/form-input.component';
import SignUpForm from "../signup-form/signup-form.component";
import { useState } from 'react';
import { createAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import '../signup-form/signup-form.styles.scss';
import Button from '../button/button.component';

const defaultFormFields = {
    email: '',
    password: ''
};
const SignIn = () => {
    useEffect(() => {
        async function fetchData() {
            // You can await here
            const response = await getRedirectResult(auth);
            console.log(response);
            if (response) {
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
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };
/* 


    const handleSubmit = async (event) => {
        event.preventDefault();
        //confirm password match
        if (password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            console.log('user ', user);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
            // console.log('user doc ref ', userDocRef);
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('email already exists');
            } else if (error.code === 'auth/weak-password') {
                alert('weak password');
            } else {
                console.log('error creating user', error.code);
            }

        }
        // createAuthUserWithEmailAndPassword
        //create a userdoc with what that returns
    }

*/
    return (
        <div className='sign-up-form-container'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <FormInput
                label="Email"
                type="email"
                required
                onChange={handleChange}
                name="email"
                value={email}
            />
            <FormInput
                label="Password"
                type="password"
                required
                onChange={handleChange}
                name="password"
                value={password}
            />

            <Button type="submit">Sign In</Button>
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