import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { IfOffline } from "../../store/IfOffline";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Nav $scrolled={scrolled}>
      <NavInner>
        <Logo to="/">
          <LogoSymbol>✦</LogoSymbol>
          Recetas
          <IfOffline>
            <OfflinePill>offline</OfflinePill>
          </IfOffline>
        </Logo>

        <NavLinks>
          <NavLink to="/" $active={location.pathname === "/"}>
            Inicio
          </NavLink>
          <NavLink to="/timer" $active={location.pathname === "/timer"}>
            ⏱ Timer
          </NavLink>
        </NavLinks>
      </NavInner>
      <Separator $scrolled={scrolled} />
    </Nav>
  );
}

const Nav = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background: ${({ $scrolled }) =>
    $scrolled ? "rgba(13,12,10,0.96)" : "transparent"};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? "blur(20px)" : "none")};
  transition:
    background 0.4s,
    backdrop-filter 0.4s;
`;

const NavInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 16px 20px;
  }
`;

const Logo = styled(Link)`
  font-family: var(--font-display);
  font-size: 26px;
  font-style: italic;
  font-weight: 400;
  color: var(--gold);
  display: flex;
  align-items: center;
  gap: 8px;
  letter-spacing: 1px;
  transition: color 0.2s;
  &:hover {
    color: var(--gold-light);
  }
`;

const LogoSymbol = styled.span`
  font-style: normal;
  font-size: 13px;
`;

const OfflinePill = styled.span`
  font-family: var(--font-body);
  font-size: 10px;
  font-style: normal;
  letter-spacing: 2px;
  text-transform: uppercase;
  background: var(--danger);
  color: #fff;
  padding: 2px 8px;
  margin-left: 4px;
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 36px;
`;

const NavLink = styled(Link)`
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: ${({ $active }) => ($active ? "var(--gold)" : "var(--fg-dim)")};
  position: relative;
  transition: color 0.2s;

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    height: 1px;
    width: ${({ $active }) => ($active ? "100%" : "0")};
    background: var(--gold);
    transition: width 0.3s;
  }
  &:hover {
    color: var(--gold);
  }
  &:hover::after {
    width: 100%;
  }
`;

const Separator = styled.div`
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  opacity: ${({ $scrolled }) => ($scrolled ? 0.35 : 0)};
  transition: opacity 0.4s;
`;
