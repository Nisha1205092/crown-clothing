import styled from "styled-components";

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-column: 2fr 2fr 1fr;
  gap: 5px;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
  justify-content: space-evenly;

  &:first-child {
    border-top: 1px solid darkgrey;
  }

  @media screen and (max-width: 400px) {
    font-size: 16px;
    justify-content: center;
  }
`;

export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const NameAndQuantityContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const PriceAndRemoveContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Name = styled.span`
  width: 23%;
`;

export const Quantity = styled.span`
  display: flex;
  width: 23%;
`;

export const Arrow = styled.div`
  cursor: pointer;
`;

export const Value = styled.span`
  margin: 0 10px;
`;

export const Price = styled.span`
  width: 23%;
  padding: 15px;
`;

export const Remove = styled.div`
  padding: 15px;
  cursor: pointer;
`;

