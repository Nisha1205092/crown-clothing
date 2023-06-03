import {
    ChangeEvent,
    FormEvent,
    useCallback,
    useContext,
    useState
} from 'react';
import FormInput from '../form-input/form-input.component';
import {
    SignInFormContainer,
    SignInButtonContainer,
    Google,
    GoogleSignInText
} from './sign-in-form.styles';
import Button from '../button/button.component';
import { useDispatch } from 'react-redux';
import {
    emailSignInStart,
    googleSignInStart
} from '../../store/user/user.action';
import { ReactComponent as GoogleSignIn } from '../../assets/google-login.svg';
import { ThemeContext } from '../../contexts/theme.context';
// import { useNavigate } from 'react-router-dom';

const defaultFormFields = {
    email: '',
    password: ''
};
const SignInForm = () => {
    const { myTheme } = useContext(ThemeContext);
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const dispatch = useDispatch();

    const signInWithGoogleHandler = useCallback(() => {
        dispatch(googleSignInStart());
    }, [dispatch]);

    // const signInWithGoogleRedirectHandler = useCallback(() => {
    //     dispatch(googleRedirectSignInStart());
    // }, [dispatch]);

    const resetFormFields = useCallback(() => {
        setFormFields(defaultFormFields);
    }, []);

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }, [formFields]);

    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(emailSignInStart(email, password));
        resetFormFields();
        // navigate('/'); //redirect to home page after successful signin
    }, [dispatch, email, password, resetFormFields])



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
                <SignInButtonContainer>
                    <Button type="submit">Sign In</Button>
                </SignInButtonContainer>

                <Google type="button" onClick={signInWithGoogleHandler}>
                    <GoogleSignIn width="20px" height="20px" />
                    <GoogleSignInText $theme={myTheme}>Continue with Google</GoogleSignInText>
                </Google>
            </form>
        </SignInFormContainer>

    );
}

export default SignInForm;