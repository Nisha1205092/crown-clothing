import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import {
    CheckoutContainer,
    CheckoutHeader,
    HeaderBlock,
    Total
} from './checkout.styles';
import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';

const Checkout = () => {
    const { cartItems, totalPrice } = useContext(CartContext);
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