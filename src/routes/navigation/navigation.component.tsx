import {
    NavigationContainer,
    NavLinksContainer,
    NavLink,
    LogoContainer
} from './navigation.styles';
import { Outlet } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { signOutStart } from '../../store/user/user.action';
import { useTheme } from '../../utils/theme/theme.utils';
import DarkModeToggle from '../../components/DarkModeToggle/DarkModeToggle.component';
import { ThemeContext } from '../../contexts/theme.context';

const Navigation = () => {
    const dispatch = useDispatch();
    const signOutHandler = () => dispatch(signOutStart());
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);

    const { themeToggler, setLightTheme, setDarkTheme } = useTheme();
    const { myTheme } = useContext(ThemeContext);

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrownLogo className='logo' />
                </LogoContainer>
                <NavLinksContainer>
                    <NavLink $theme={myTheme} to='/shop'>
                        SHOP
                    </NavLink>
                    {
                        currentUser ?
                            (
                                <NavLink $theme={myTheme} as='span'
                                    className='nav-link'
                                    onClick={signOutHandler}
                                >
                                    SIGN OUT
                                </NavLink>
                            )
                            : (<NavLink $theme={myTheme} to='/auth'>SIGNIN</NavLink>)
                    }
                    <CartIcon />
                    <DarkModeToggle toggle={themeToggler} setLight={setLightTheme} setDark={setDarkTheme} />
                </NavLinksContainer>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;