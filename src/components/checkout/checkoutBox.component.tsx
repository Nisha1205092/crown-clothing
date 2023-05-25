import { useSelector } from 'react-redux';
import { selectCartItems, selectTotalPrice } from '../../store/cart/cart.selector';
import PaymentForm from '../../components/payment-form/payment-form.component';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { Total } from './checkoutBox.styles';
import { Fragment } from 'react';

const CheckoutBox = () => {
    const cartItems = useSelector(selectCartItems);
    const totalPrice = useSelector(selectTotalPrice);
    return (
        <Fragment>
            {
                cartItems.map(item =>
                    <CheckoutItem key={item.id} cartItem={item} />
                )
            }
            < Total > TOTAL: ${totalPrice}</Total >
            <PaymentForm />
        </Fragment>
    );
}

export default CheckoutBox;