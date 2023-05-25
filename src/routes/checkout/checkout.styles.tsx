import styled from "styled-components";

export const CheckoutContainer = styled.div`
  width: 80%;
  max-width: 700px;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 0;

  @media scree and (max-width: 400px) {
    width: 85vw;
  }

  @media screen and (min-width: 800px) {
    width: 40vw;
  }
`;

export const CheckoutHeader = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid darkgrey;
`;

export const HeaderBlock = styled.div`
  text-transform: capitalize;
  width: 23%;

  &:last-child {
    width: 8%;
  }
`;


