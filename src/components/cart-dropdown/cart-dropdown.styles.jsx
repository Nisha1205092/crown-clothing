import styled from "styled-components";

export const CartItems = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

export const EmptyMessage = styled.span`
  font-size: 18px;
  margin: 50px auto;
`;

export const CartDropDownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 130px;
  right: 6px;
  z-index: 5;

  button {
    margin-top: auto;
  }

  .checkout-button {
    margin-top: 50px;
    width: 240px;
  }
`;
