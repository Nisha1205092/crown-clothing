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
            display: none;
        }
    }
`;

export const SignInButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export const GoogleRedirect = styled.div`
    @media screen and (max-width: 800px) {
        display: none;
    }
`;

export const Google = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: auto;
    background: none;
    border: none;
    
    p {
        font-size: 14px;
        margin-left: 6px;
    }
`;