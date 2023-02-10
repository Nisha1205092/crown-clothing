import './navigation.styles.scss';
import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    console.log(currentUser);
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
                    <Link className='nav-link' to='/auth'>
                        SIGNIN
                    </Link>
                </div>
                <Outlet />
            </div>
        </Fragment>
    );
}

export default Navigation;