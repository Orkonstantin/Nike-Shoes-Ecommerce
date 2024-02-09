import BarsIcon from "@/components/icons/Bars";
import CartIcon from "@/components/icons/CartIcon";
import Link from "next/link";
import styled from "styled-components";

export const StyledBarsIcon = styled(BarsIcon)`
  width: 4vw;
  height: 4vw;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  @media (max-width: 600px) {
    width: 6vw;
    height: 6vw;
  }
`;

export const StyledHeader = styled.header`
  background-color: #222;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
  display: flex;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  align-items: center;
`;

export const StyledNav = styled.nav`
  transform: ${(props) =>
    props.mobileNavActive ? "translateX(0)" : "translateX(100%)"};
  transition: transform 0.5s ease-in-out, visibility 0.5s ease-in-out,
    opacity 0.5s ease-in-out;
  visibility: ${(props) => (props.mobileNavActive ? "visible" : "hidden")};
  opacity: ${(props) => (props.mobileNavActive ? "1" : "0")};
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    visibility: visible;
    opacity: 1;
    display: flex;
    position: static;
    padding: 0;
    transform: translateX(0);
  }
  @media screen and (max-width: 768px) {
    background: rgba(29, 29, 29, 0.9);
    backdrop-filter: blur(2px);
    width: 140px;
  }
`;

export const NavLink = styled(Link)`
  display: block;
  color: #aaa;
  text-decoration: none;
  padding: 10px 10px 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
  &:hover {
    background-color: #3c3c3c;
    border-radius: 10px;
  }
`;

export const NavButton = styled.button`
  background-color: transparent;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
  &:hover {
    background-color: #3c3c3c;
    border-radius: 10px;
  }
`;

export const CenteredNavLink = styled(NavLink)`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: transparent;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  &:hover {
    background-color: transparent;
  }
`;

export const LogoAndNavLinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const CartIconHeader = styled(CartIcon)`
  width: 4vw;
  height: 4vw;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  position: relative;
  @media (max-width: 700px) {
    width: 5vw;
    height: 5vw;
  }
  @media (max-width: 600px) {
    width: 6vw;
    height: 6vw;
  }
  @media (max-width: 480px) {
    width: 7vw;
    height: 7vw;
  }
  @media (max-width: 380px) {
    width: 8vw;
    height: 8vw;
  }
  @media (max-width: 320px) {
    width: 9vw;
    height: 9vw;
  }
`;
