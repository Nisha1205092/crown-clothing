import styled from "styled-components";

export const SignInFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 430px;

    h2 {
        margin: 10px 0;
    }

    @media screen and (max-width: 800px) {
        width: 100%;
`;

export const RedirectButtons = styled.div`
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    
    @media screen and (max-width: 800px) {
        button {
            width: 60%;
        }
    }
`;

export const SignInButtonContainer = styled.div`
    display: flex;
    justify-content: center;

    @media screen and (max-width: 800px) {
        button {
            width: 60%;
        }
    }
`;

export const GoogleRedirect = styled.div`
    @media screen and (max-width: 800px) {
        display: none;
    }
`;
