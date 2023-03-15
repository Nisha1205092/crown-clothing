import { 
    NavigationContainer, 
    NavLinksContainer, 
    NavLink, 
    LogoContainer 
} from './navigation.styles';
import { Outlet } from 'react-router-dom';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
// import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils'; 
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
// import { CartContext } from '../../contexts/cart.context';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    // const { currentUser } = useContext(UserContext);
    const isCartOpen = useSelector(selectIsCartOpen);
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