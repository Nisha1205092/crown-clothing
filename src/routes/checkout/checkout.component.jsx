import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import './checkout.styles.scss';
import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';

const Checkout = () => {
    const { cartItems } = useContext(CartContext);
    return (
        <div className='checkout-page-container'>
            <div className='checkout-items-container'>
                <div className='header'>
                    <h4>Product</h4>
                </div>
                <div className='header'>
                    <h4>Description</h4>
                </div>
                <div className='header'>
                    <h4>Quantity</h4>
                </div>
                <div className='header'>
                    <h4>Price</h4>
                </div>
                <div className='header'>
                    <h4>Remove</h4>
                </div>
            </div>
            {
                cartItems.map(item => 
                    <CheckoutItem key={item.id} cartItem={item} />
                )
            }
            <footer>*Please use the following test credit card for payments*</footer>
        </div>
    );
};

export default Checkout;