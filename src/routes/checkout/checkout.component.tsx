import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import {
    CheckoutContainer,
    Total
} from './checkout.styles';
import { useSelector } from 'react-redux';
import { selectCartItems, selectTotalPrice } from '../../store/cart/cart.selector';
import PaymentForm from '../../components/payment-form/payment-form.component';

const Checkout = () => {
    const cartItems = useSelector(selectCartItems);
    const totalPrice = useSelector(selectTotalPrice);

    return (
        <CheckoutContainer>
            {
                cartItems.map(item =>
                    <CheckoutItem key={item.id} cartItem={item} />
                )
            }
            <Total>TOTAL: ${totalPrice}</Total>
            <PaymentForm />
        </CheckoutContainer>
    );
};

export default Checkout;