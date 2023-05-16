import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import { useSelector } from 'react-redux';
import Spinner from "../../components/spinner/spinner.component";
import { Fragment, useEffect, useState } from 'react';
import { AuthenticationContainer } from './authentication.styles';
import { selectCurrentUser, selectUserIsLoading } from "../../store/user/user.selector";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
    const userIsLoading = useSelector(selectUserIsLoading);
    const currentUser = useSelector(selectCurrentUser);
    const [showComponents, setShowComponents] = useState(false);
    const navigate = useNavigate();

    // when a signin error happens, the page gets stuck in a 
    // Loading state. So we have added a three sec timeout
    // to break out of the Loading state
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowComponents(true);
            alert('Taking longer than expected!');
        }, 3000);

        return () => clearTimeout(timeoutId);
    }, []);

    //check if the user is logged-in, if not redirect
    useEffect(() => {
        if (currentUser) {
            navigate('/shop');
        }
    }, [currentUser, navigate]);

    return (
        <Fragment>
            {userIsLoading && !showComponents ? <Spinner /> : (
                <AuthenticationContainer>
                    {showComponents && (
                        <Fragment>
                            <SignInForm />
                            <SignUpForm />
                        </Fragment>
                    )}
                </AuthenticationContainer>
            )}
        </Fragment>
    );
}

export default Authentication;