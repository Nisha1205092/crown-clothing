import {
    CheckoutItemContainer,
    ImageContainer,
    Name,
    Quantity,
    Arrow,
    Value,
    Price,
    Remove,
    NameAndQuantityContainer,
    PriceAndRemoveContainer
} from './checkout-item.styles';
// import { CartContext } from '../../contexts/cart.context';
// import { useContext } from 'react';
import { decrementQuantity, incrementQuantity, removeCartItem } from '../../store/cart/cart.action';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { FC, useCallback } from 'react';
import { CartItem } from '../../store/cart/cart.types';

type CheckoutItemProps = {
    cartItem: CartItem;
}

const CheckoutItem: FC<CheckoutItemProps> = ({ cartItem }) => {
    const dispatch = useDispatch();
    const { name, price, imageUrl, quantity } = cartItem;
    // const { decrementQuantity, incrementQuantity, removeCartItem } = useContext(CartContext);
    const cartItems = useSelector(selectCartItems);

    const downArroHandler = useCallback(() => {
        dispatch(decrementQuantity(cartItem, cartItems));
    }, [cartItems, cartItem, dispatch]);

    const upArrowHandler = useCallback(() => {
        dispatch(incrementQuantity(cartItem, cartItems));
    }, [dispatch, cartItem, cartItems]);

    const crossHandler = useCallback(() => {
        dispatch(removeCartItem(cartItem, cartItems));
    }, [dispatch, cartItem, cartItems]);

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <NameAndQuantityContainer>
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
            </NameAndQuantityContainer>
            <PriceAndRemoveContainer>
                <Price> {`$${price}`}</Price>
                <Remove onClick={crossHandler}>
                    &#10005;
                </Remove>
            </PriceAndRemoveContainer>
        </CheckoutItemContainer>
    );
};

export default CheckoutItem;