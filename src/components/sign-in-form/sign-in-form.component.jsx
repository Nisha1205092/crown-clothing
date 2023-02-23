import {
    useEffect,
    useState
} from 'react';
import { getRedirectResult } from 'firebase/auth';
import {
    auth,
    signInWithGooglePopup,
    signInWithGoogleRedirect,
    logInWithEmailAndPassword,
    createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";
import FormInput from '../form-input/form-input.component';
import { 
    SignInFormContainer, 
    RedirectContainer, 
    RedirectButton,
    SignInButtonsContainer 
} from './sign-in-form.styles';
import Button from '../button/button.component';

const defaultFormFields = {
    email: '',
    password: ''
};
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

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
        await signInWithGooglePopup();

    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // console.log('email received ', email);
            // console.log('password received ', password);
            const { user } = await logInWithEmailAndPassword(email, password);
            console.log('user signing in ', user);
            resetFormFields();
            alert('Sign in successful');
            // store it inside the UserContext
        } catch (error) {
            console.log('error signing in user');
        }

    }
    // createAuthUserWithEmailAndPassword
    //create a userdoc with what that returns



    return (
        <SignInFormContainer>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form action="" onSubmit={handleSubmit}>
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
                <RedirectContainer>
                    <SignInButtonsContainer>
                        <Button type="submit">Sign In</Button>
                        <Button type="button" onClick={logGoogleUser} buttonType={'google'}>
                            Google Sign In
                        </Button>
                    </SignInButtonsContainer>
                    <RedirectButton>
                        <Button type="button" onClick={signInWithGoogleRedirect} buttonType={'redir'}>
                            Google Redirect
                        </Button>
                    </RedirectButton>
                </RedirectContainer>
            </form>
        </SignInFormContainer>

    );
}

export default SignInForm;