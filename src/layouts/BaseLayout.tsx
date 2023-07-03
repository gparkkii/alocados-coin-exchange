import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { ReactComponent as Logo } from 'assets/Image/Logo.svg';
import { PATH } from 'routes/path';
import { ButtonText } from 'styles/typography';

const Header = styled.header`
  position: fixed;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 120px;
  padding: 32px;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 24px;
`;

const NavButton = styled(NavLink)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  padding: 10px 16px;
  border-radius: 12px;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary24 : theme.colors.white};
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  padding-top: 120px;
`;

interface NavMenuProps {
  path: string;
  name: string;
}

const NavMenu = ({ path, name }: NavMenuProps) => {
  const { pathname } = useLocation();
  const isActive = pathname === path;
  return (
    <NavButton to={path} $isActive={isActive}>
      <ButtonText $textcolor={isActive ? 'primary100' : 'shade700'}>
        {name}
      </ButtonText>
    </NavButton>
  );
};

const BaseLayout = () => {
  return (
    <div>
      <Header>
        <Logo width={168} height={40} />
        <Nav>
          <NavMenu path={PATH.exchange} name="환전하기" />
          <NavMenu path={PATH.history} name="거래내역" />
        </Nav>
      </Header>
      <Main>
        <Outlet />
      </Main>
    </div>
  );
};

export default BaseLayout;
