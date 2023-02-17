import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
    const { name, price, imageUrl, quantity } = cartItem;
    return (
        <div>
            <h2>{name}</h2>
            <h3>{price}</h3>
            <h3>{quantity}</h3>
        </div>
    );
};

export default CheckoutItem;