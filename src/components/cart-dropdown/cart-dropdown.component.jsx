import './cart-dropdown.styles.scss';
import '../button/button.styles.scss';
import React from 'react';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { Link } from 'react-router-dom';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map(item =>
                    <CartItem key={item.id} cartItem={item} />)}
            </div>
            <Link to='/checkout'>
                <Button className='button-container checkout-button'>Go to Checkout</Button>
            </Link>
        </div>
    );
};

export default CartDropdown;