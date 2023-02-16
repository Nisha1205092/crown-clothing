import './cart-dropdown.styles.scss';
import React from 'react';
import Button from '../button/button.component';

const CartDropdown = () => {
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items' />
            <Button>Go to Checkout</Button>
        </div>
    );
};

export default CartDropdown;