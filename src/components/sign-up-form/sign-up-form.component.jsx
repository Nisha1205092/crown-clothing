import Button from "../button/button.component";
import { SignUpFormContainer } from "./sign-up-form.styles.jsx";
import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const dispatch = useDispatch();

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        //confirm password match
        if (password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }
        dispatch(signUpStart(email, password, displayName));
        resetFormFields();
        // try {
        //     const { user } = await createAuthUserWithEmailAndPassword(email, password);
        //     await createUserDocumentFromAuth(user, { displayName });
        //     alert('Successful sign up');
        // } catch(error) {
        //     if (error.code === 'auth/email-already-in-use') {
        //         alert('email already exists');
        //     } else if(error.code === 'auth/weak-password') {
        //         alert('weak password');
        //     } else {
        //         console.log('error creating user', error.code);
        //     }
            
        // }
        // createAuthUserWithEmailAndPassword
        //create a userdoc with what that returns
    }
    return (
        <SignUpFormContainer>
            <h2>I do not have an account</h2>
            <span>Sign up with your email and password</span>
            <form action="" onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text"
                    required
                    onChange={handleChange}
                    name="displayName"
                    value={displayName}
                />

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

                <FormInput
                    label="Confirm Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                />

                <Button type="submit">Sign Up</Button>

            </form>
        </SignUpFormContainer>
    );
};

export default SignUpForm;