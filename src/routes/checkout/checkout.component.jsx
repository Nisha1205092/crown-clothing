import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import {
    CheckoutContainer,
    CheckoutHeader,
    HeaderBlock,
    Total
} from './checkout.styles';
// import { CartContext } from '../../contexts/cart.context';
// import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems, selectTotalPrice } from '../../store/cart/cart.selector';

const Checkout = () => {
    // const { cartItems, totalPrice } = useContext(CartContext);
    const cartItems = useSelector(selectCartItems);
    const totalPrice = useSelector(selectTotalPrice);

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {
                cartItems.map(item =>
                    <CheckoutItem key={item.id} cartItem={item} />
                )
            }
            <Total>TOTAL: ${totalPrice}</Total>
        </CheckoutContainer>
    );
};

export default Checkout;