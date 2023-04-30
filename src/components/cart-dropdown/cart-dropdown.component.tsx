import {
    CartDropDownContainer,
    CartItems,
    EmptyMessage
} from './cart-dropdown.styles';
import { useCallback } from 'react';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
// import { useContext } from 'react';
// import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();
    const goToCheckoutHandler = useCallback(() => {
        navigate('./checkout');
    }, [navigate])
    return (
        <CartDropDownContainer>
            <CartItems>
                {cartItems.length
                    ? cartItems.map(item =>
                        <CartItem key={item.id} cartItem={item} />)
                    : <EmptyMessage>Your Cart is Empty</EmptyMessage>
                }
            </CartItems>
            <Button
                buttonType={BUTTON_TYPE_CLASSES.base}
                onClick={goToCheckoutHandler}>
                Go to Checkout
            </Button>
        </CartDropDownContainer>
    );
};

export default CartDropdown;