import {
    CartIconContainer, 
    ItemCount
} from './cart-icon.styles';
// import { useContext } from 'react';
// import { CartContext } from '../../contexts/cart.context';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsCartOpen, selectCartItemCount } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

const CartIcon = () => {
    // const { isCartOpen, setIsCartOpen, cartItemCount } = useContext(CartContext);
    const dispatch = useDispatch();

    const isCartOpen = useSelector(selectIsCartOpen);
    const cartItemCount = useSelector(selectCartItemCount);

    const toggleCart = () => {
        dispatch(setIsCartOpen(!isCartOpen))
    };

    return (
        <CartIconContainer onClick={toggleCart}>
            <ShoppingIcon />
            <ItemCount>{cartItemCount}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;