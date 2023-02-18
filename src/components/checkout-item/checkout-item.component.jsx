import './checkout-item.styles.scss';
import { ReactComponent as UpArrow } from '../../assets/up-arrow.svg';
import { ReactComponent as DownArrow } from '../../assets/down-arrow.svg';
import { ReactComponent as Cross } from '../../assets/cross.svg';
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
            <img className='image-item' src={imageUrl} alt={`${name}`} />
            <h2>{name}</h2>
            <DownArrow className='down-arrow' onClick={downArroHandler} />
            <h3>{`${quantity}`}</h3>
            <UpArrow className='up-arrow' onClick={upArrowHandler} />
            <h3>{`$${price} `}</h3>
            <Cross className='cross' onClick={crossHandler} />
        </div>
    );
};

export default CheckoutItem;