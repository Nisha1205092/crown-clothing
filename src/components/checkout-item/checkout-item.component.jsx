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
import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';

const CheckoutItem = ({ cartItem }) => {
    const { name, price, imageUrl, quantity } = cartItem;
    const { decrementQuantity, incrementQuantity, removeCartItem } = useContext(CartContext);

    const downArroHandler = () => {
        decrementQuantity(cartItem);
    };
    const upArrowHandler = () => {
        incrementQuantity(cartItem);
    };
    const crossHandler = () => {
        removeCartItem(cartItem);
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