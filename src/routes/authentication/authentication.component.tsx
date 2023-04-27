import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import { useSelector } from 'react-redux';
import Spinner from "../../components/spinner/spinner.component";
import { Fragment } from 'react';
import { AuthenticationContainer } from './authentication.styles';
import { selectUserIsLoading } from "../../store/user/user.selector";

const Authentication = () => {
    const userIsLoading = useSelector(selectUserIsLoading);
    return (
        <Fragment>
            {
                userIsLoading ? <Spinner /> :
                    (<AuthenticationContainer>
                        <SignInForm />
                        <SignUpForm />
                    </AuthenticationContainer>)
            }
        </Fragment>
    );
}

export default Authentication;