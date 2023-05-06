import styled from "styled-components";
import Button from "../button/button.component";

export const PaymentFormContainer = styled.div`
    height: 300px;
    width: 40vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 800px) {
        width: 60vw;
    }
`;

export const FormContainer = styled.form`
    height: 100px;
    width: 80%;

    @media screen and (max-width: 800px) {
        max-width: 80vw;
    }
`;

export const PaymentButton = styled(Button)`
    margin-left: auto;
    margin-top: 30px;
`;