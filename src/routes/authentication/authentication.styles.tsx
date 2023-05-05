import styled from "styled-components";

export const AuthenticationContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    column-gap: 70px;
    margin: 0 20px;

    @media screen and (max-width: 800px) {
        display: flex;
        flex-flow: column wrap;
        row-gap: 70px;
        margin: auto;
    }
`;
