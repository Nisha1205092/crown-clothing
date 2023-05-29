import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
        transition: all 0.50s linear;
        font-family: 'Open Sans Condensed';
        padding: 30px 20px;
    }
`;

export default GlobalStyle;