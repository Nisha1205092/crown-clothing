import {
    CheckoutItemContainer,
    ImageContainer,
    Name,
    Quantity,
    Arrow,
    Value,
    Price,
    Remove
} from './checkout-item.styles';
// import { CartContext } from '../../contexts/cart.context';
// import { useContext } from 'react';
import { decrementQuantity, incrementQuantity, removeCartItem } from '../../store/cart/cart.action';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

const CheckoutItem = ({ cartItem }) => {
    const dispatch = useDispatch();
    const { name, price, imageUrl, quantity } = cartItem;
    // const { decrementQuantity, incrementQuantity, removeCartItem } = useContext(CartContext);
    const cartItems = useSelector(selectCartItems);

    const downArroHandler = () => {
        dispatch(decrementQuantity(cartItem, cartItems));
    };
    const upArrowHandler = () => {
        dispatch(incrementQuantity(cartItem, cartItems));
    };
    const crossHandler = () => {
        dispatch(removeCartItem(cartItem, cartItems));
    };

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <Name> {name} </Name>
            <Quantity>
                <Arrow onClick={downArroHandler}>
                    &#10094;
                </Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={upArrowHandler}>
                    &#10095;
                </Arrow>
            </Quantity>
            <Price> {price}</Price>
            <Remove onClick={crossHandler}>
                &#10005;
            </Remove>
        </CheckoutItemContainer>
    );
};

export default CheckoutItem;