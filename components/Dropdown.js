// Dropdown.js
import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

const DropdownMenu = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 10px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  background-color: #222;
  border-radius: 20px;
  @media screen and (max-width: 768px) {
    position: static;
    display: ${(props) => (props.isOpen ? "block" : "none")};
    width: 100%;
    background: rgba(29, 29, 29, 0.9);
  }
`;

const DropdownItem = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  color: #aaa;
  text-align: center;

  &:hover {
    background-color: #3c3c3c;
    border-radius: 30px;
  }
  @media screen and (max-width: 768px) {
    display: inline-block;
    letter-spacing: 0.5px;
    font-size: 0.9rem;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color: #aaa;
  text-decoration: none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
  &:hover {
    background-color: #3c3c3c;
    border-radius: 10px;
  }
`;

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <NavLink href={"/categories"}>Categories</NavLink>
      <DropdownMenu isOpen={isOpen}>
        <DropdownItem href={"/categories/men"}>Men</DropdownItem>
        <DropdownItem href={"/categories/women"}>Women</DropdownItem>
        <DropdownItem href={"/categories/kids"}>Kids</DropdownItem>
      </DropdownMenu>
    </div>
  );
}
