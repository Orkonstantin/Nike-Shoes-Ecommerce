import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Dropdown from "@/components/Dropdown";
import BarsIcon from "@/components/icons/Bars";
import { useContext, useState } from "react";
import {
  Logo,
  NavButton,
  NavLink,
  NikeIcon,
  NikeTitle,
  StyledHeader,
  StyledNav,
  Wrapper,
} from "./styles/HeaderStyles";

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>
            <NikeIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 192.756 192.756"
                id="nike"
              >
                <g fill-rule="evenodd" clip-rule="evenodd">
                  <path fill="#fff" d="M0 0h192.756v192.756H0V0z"></path>
                  <path d="M42.741 71.477c-9.881 11.604-19.355 25.994-19.45 36.75-.037 4.047 1.255 7.58 4.354 10.256 4.46 3.854 9.374 5.213 14.264 5.221 7.146.01 14.242-2.873 19.798-5.096 9.357-3.742 112.79-48.659 112.79-48.659.998-.5.811-1.123-.438-.812-.504.126-112.603 30.505-112.603 30.505a24.771 24.771 0 0 1-6.524.934c-8.615.051-16.281-4.731-16.219-14.808.024-3.943 1.231-8.698 4.028-14.291z"></path>
                </g>
              </svg>
            </NikeIcon>
            <NikeTitle>Nike Shoes E-commerce</NikeTitle>
          </Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>All Shoes</NavLink>
            <Dropdown />
            <NavLink href={"/cart"}>
              Cart (
              {cartProducts.reduce(
                (total, product) => total + product.quantity,
                0
              )}
              )
            </NavLink>
          </StyledNav>
          <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
