import SignInForm from "../../components/sign-in-form/sign-in.component";
import SignUpForm from "../../components/signup-form/signup-form.component";

import './authentication.styles.scss';

const Authentication = () => {
    return (
        <div className="authentication-container">
            <SignInForm />
            <SignUpForm />
        </div>
    );
}

export default Authentication;