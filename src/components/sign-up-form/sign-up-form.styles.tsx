import styled from "styled-components";

export const SignUpFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 430px;
    margin: auto;

    h2 {
        margin: 10px 0;
    }

    @media screen and (min-width: 800px) {
        margin: 0 20px 0 0;
    }

    @media screen and (max-width: 800px) {
        width: 70vw;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;