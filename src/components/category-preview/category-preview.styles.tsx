import styled from "styled-components";
import { Link } from "react-router-dom";
import { primaryTextColor, primaryTextHoverColor } from "../../utils/theme/theme.utils";

export const CategoryPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 800px) {
    align-items: center;
  }
`;

export const Title = styled(Link)`
  font-size: 28px;
  margin-bottom: 25px;
  cursor: pointer;
  color: ${primaryTextColor};
  text-decoration: none;

  &:hover {
    color: ${primaryTextHoverColor};
  }
`;

export const Preview = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  margin-bottom: 15px;

  @media screen and (max-width: 800px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 15px;
    row-gap: 25px;
  }
`;

