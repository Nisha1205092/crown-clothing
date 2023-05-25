import {
    CheckoutContainer
} from './checkout.styles';
import CheckoutBox from '../../components/checkout/checkoutBox.component';
import { selectCartItems } from '../../store/cart/cart.selector';
import { useSelector } from 'react-redux';
import { EmptyMessage } from '../../components/cart-dropdown/cart-dropdown.styles';

const Checkout = () => {
    const cartItems = useSelector(selectCartItems);
    return (
        <CheckoutContainer>
            {
                cartItems.length
                    ? <CheckoutBox />
                    : <EmptyMessage>Your Cart is Empty</EmptyMessage>
            }

        </CheckoutContainer>
    );
};

export default Checkout;