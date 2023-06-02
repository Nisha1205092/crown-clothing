import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { primaryTextColor, primaryTextHoverColor } from '../../utils/theme/theme.utils';

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 800px) {
    height: 60px;
  }
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;

  @media screen and (max-width: 800px) {
    width: 50px;
  }
`;

export const NavLinksContainer = styled.div`
  width: 50% %;
  height: 100 %;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 800px) {
    width: 80%;
  }
`;

export const NavLink = styled(Link) <{ $theme?: string; }>`
  padding: 10px 15px;
  cursor: pointer;
  text-decoration: none;
  color: ${primaryTextColor};

  &:hover {
    color: ${primaryTextHoverColor};
  }
`;


