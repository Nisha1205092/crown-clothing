import {
    NavigationContainer,
    NavLinksContainer,
    NavLink,
    LogoContainer
} from './navigation.styles';
import { Outlet } from 'react-router-dom';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { signOutStart } from '../../store/user/user.action';

const Navigation = () => {
    const dispatch = useDispatch();
    const signOutHandler = () => dispatch(signOutStart());
    const currentUser = useSelector(selectCurrentUser);
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
                            (
                                <NavLink as='span'
                                    className='nav-link'
                                    onClick={signOutHandler}
                                >
                                    SIGN OUT
                                </NavLink>
                            )
                            : (<NavLink to='/auth'>SIGNIN</NavLink>)
                    }
                    <CartIcon />
                </NavLinksContainer>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;