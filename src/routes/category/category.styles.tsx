import styled from "styled-components";

export const CategoryContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 20px;
    row-gap: 50px;

    @media screen and (max-width: 800px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        row-gap: 30px;
    }
`;

export const CategoryTitle = styled.h2`
    font-size: 32px;
    margin-bottom: 25px;
    text-align: center;
`;

