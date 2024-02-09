import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Dropdown from "@/components/Dropdown";
import NikeIcon from "@/components/icons/NikeIcon";
import { useContext, useEffect, useState } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import {
  Logo,
  NavButton,
  NavLink,
  StyledBarsIcon,
  StyledHeader,
  StyledNav,
  Wrapper,
  CenteredNavLink,
  LogoAndNavLinkContainer,
  CartIconHeader,
} from "./styles/HeaderStyles";
import CartCountBubble from "@/components/CartCountBubble";

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(
      cartProducts.reduce((total, product) => total + product.quantity, 0)
    );
  }, [cartProducts]);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <LogoAndNavLinkContainer>
            <Logo href={"/"}>
              <NikeIcon />
            </Logo>
            <CenteredNavLink href={"/cart"}>
              <CartIconHeader />
              <CartCountBubble count={cartCount} />
            </CenteredNavLink>
          </LogoAndNavLinkContainer>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>All Shoes</NavLink>
            <Dropdown />
          </StyledNav>
          <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
            <StyledBarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
