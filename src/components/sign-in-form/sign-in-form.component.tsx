import {
    ChangeEvent,
    FormEvent,
    useState
} from 'react';
import FormInput from '../form-input/form-input.component';
import {
    SignInFormContainer,
    RedirectContainer,
    RedirectButton,
    SignInButtonsContainer
} from './sign-in-form.styles';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { useDispatch } from 'react-redux';
import {
    emailSignInStart,
    googleRedirectSignInStart,
    googleSignInStart
} from '../../store/user/user.action';

const defaultFormFields = {
    email: '',
    password: ''
};
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const dispatch = useDispatch();

    const signInWithGoogleHandler = () => {
        dispatch(googleSignInStart());
    };

    const signInWithGoogleRedirectHandler = () => {
        dispatch(googleRedirectSignInStart());
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(emailSignInStart(email, password));
        resetFormFields();
    }

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
                        <Button type="button" onClick={signInWithGoogleHandler} buttonType={BUTTON_TYPE_CLASSES.google}>
                            Google Sign In
                        </Button>
                    </SignInButtonsContainer>
                    <RedirectButton>
                        <Button type="button" onClick={signInWithGoogleRedirectHandler} buttonType={BUTTON_TYPE_CLASSES.redir}>
                            Google Redirect
                        </Button>
                    </RedirectButton>
                </RedirectContainer>
            </form>
        </SignInFormContainer>

    );
}

export default SignInForm;