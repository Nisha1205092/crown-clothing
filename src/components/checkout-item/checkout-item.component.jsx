import './checkout-item.styles.scss';
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
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'> {name} </span>
            <span className='quantity'>
                <div className='arrow' onClick={downArroHandler}>
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={upArrowHandler}>
                    &#10095;
                </div>
            </span>
            <span className='price'> {price}</span>
            <div className='remove-button' onClick={crossHandler}>
                &#10005;
            </div>
        </div>
    );
};

export default CheckoutItem;