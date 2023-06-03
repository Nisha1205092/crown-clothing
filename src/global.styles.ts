import { createGlobalStyle } from 'styled-components';
import { CartDropDownContainer } from './components/cart-dropdown/cart-dropdown.styles';

const GlobalStyle = createGlobalStyle`
    body, ${CartDropDownContainer} {
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
    }
    body {
        transition: all 0.50s linear;
        font-family: 'Open Sans Condensed';
        padding: 30px 20px;
    }
`;

export default GlobalStyle;