import { 
    NavigationContainer, 
    NavLinksContainer, 
    NavLink, 
    LogoContainer 
} from './navigation.styles';
import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils'; 
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../contexts/cart.context';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrownLogo className='logo' />
                </LogoContainer>
                <NavLinksContainer>
                    <NavLink to='/shop'>
                        SHOP
                    </NavLink>
                    {
                        currentUser ?
                            (<NavLink as='span' className='nav-link' onClick={signOutUser}>SIGN OUT</NavLink>)
                            : (<NavLink to='/auth'>SIGNIN</NavLink>)
                    }
                    <CartIcon />
                </NavLinksContainer>
                { isCartOpen && <CartDropdown />}
                <Outlet />
            </NavigationContainer>
        </Fragment>
    );
}

export default Navigation;