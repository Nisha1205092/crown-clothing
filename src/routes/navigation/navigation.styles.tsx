import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 25px;

  @media screen and (max-width: 800px) {
    height: 60px;
    padding: 10px;
    margin-top: 25px;
  }
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 10px 25px;

  @media screen and (max-width: 800px) {
    width: 50px;
    padding: 0 0 0 5px;
  }
`;

export const NavLinksContainer = styled.div`
  width: 50% %;
  height: 100 %;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 30px;

  @media screen and (max-width: 800px) {
    width: 80%;
  }
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;


