import './navigation.styles.scss';
import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils'; 

const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    console.log(currentUser);
    const signOutHandler = async () => {
        await signOutUser();
        setCurrentUser(null);
    }
    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrownLogo className='logo' />
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    {
                        currentUser ?
                            (<span className='nav-link' onClick={signOutHandler}>SIGN OUT</span>)
                            : (<Link className='nav-link' to='/auth'>SIGNIN</Link>)
                    }

                </div>
                <Outlet />
            </div>
        </Fragment>
    );
}

export default Navigation;