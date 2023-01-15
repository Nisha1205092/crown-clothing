import { useState } from "react";
import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth 
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

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
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            console.log('user ', user);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
            // console.log('user doc ref ', userDocRef);
        } catch(error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('email already exists');
            } else {
                console.log('error creating user', error.code);
            }
            
        }
        // createAuthUserWithEmailAndPassword
        //create a userdoc with what that returns
    }
    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form action="" onSubmit={handleSubmit}>
                <label>Display name</label>
                <input
                    type="text"
                    required
                    onChange={handleChange}
                    name="displayName"
                    value={displayName}
                />

                <label>Email</label>
                <input
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                />

                <label>Password</label>
                <input
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />

                <label>Confirm Password</label>
                <input
                    type="password"
                    required
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                />

                <button type="submit">Sign Up</button>

            </form>
        </div>
    );
};

export default SignUpForm;