import {
    CartDropDownContainer, 
    CartItems,
    EmptyMessage
} from './cart-dropdown.styles';
import React from 'react';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();
    const goToCheckoutHandler = () => {
        navigate('./checkout');
    }
    return (
        <CartDropDownContainer>
            <CartItems>
                { cartItems.length 
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