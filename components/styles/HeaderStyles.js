import Link from "next/link";
import styled from "styled-components";

export const NikeIcon = styled.div`
  padding-right: 10px;
  display: flex;
  align-items: center;
`;

export const NikeTitle = styled.div`
  align-items: center;
  display: flex;
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
  padding: 10px 0px;
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
  width: 30px;
  height: 30px;
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
