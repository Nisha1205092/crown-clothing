import {
    CartItemContainer,
    ItemDetails
} from './cart-item.styles';
import { FC } from 'react';
import { CartItem as TCartItem } from '../../store/cart/cart.types';
type CartItemProps = {
    cartItem: TCartItem;
}

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
    const { name, price, imageUrl, quantity } = cartItem;
    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`} />
            <ItemDetails>
                <span>{name}</span>
                <span>
                    {quantity} x ${price}</span>
            </ItemDetails>
        </CartItemContainer>
    );
};

export default CartItem;