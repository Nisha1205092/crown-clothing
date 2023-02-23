import {
    CartIconContainer, 
    ItemCount
} from './cart-icon.styles';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartItemCount } = useContext(CartContext);

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    return (
        <CartIconContainer onClick={toggleCart}>
            <ShoppingIcon />
            <ItemCount>{cartItemCount}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;