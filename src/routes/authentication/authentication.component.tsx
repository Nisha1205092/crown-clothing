import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import { useSelector } from 'react-redux';
import Spinner from "../../components/spinner/spinner.component";
import { Fragment, useEffect, useState } from 'react';
import { AuthenticationContainer } from './authentication.styles';
import { selectUserIsLoading } from "../../store/user/user.selector";

const Authentication = () => {
    const userIsLoading = useSelector(selectUserIsLoading);
    const [showComponents, setShowComponents] = useState(false);

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
    // return (
    //     <Fragment>
    //         {
    //             userIsLoading ? <Spinner /> :
    //                 (<AuthenticationContainer>
    //                     <SignInForm />
    //                     <SignUpForm />
    //                 </AuthenticationContainer>)
    //         }
    //     </Fragment>
    // );
}

export default Authentication;