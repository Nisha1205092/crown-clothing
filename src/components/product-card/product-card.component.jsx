import {
    ProductCardContainer,
    Footer, 
    Price, 
    Name
} from './product-card.styles';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { addItemToCart } from '../../store/cart/cart.action';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
// import { useContext } from 'react';
// import { CartContext } from '../../contexts/cart.context';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const { name, price, imageUrl } = product;
    const cartItems = useSelector(selectCartItems);
    const addProductToCart = () => {
        console.log('product: ', product);
        console.log('cartItems: ', cartItems);
        dispatch(addItemToCart(product, cartItems));
    };
    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`} />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>
                Add to Cart
            </Button>
        </ProductCardContainer>
    );
}

export default ProductCard;