import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Dropdown from "@/components/Dropdown";
import NikeIcon from "@/components/icons/NikeIcon";
import { useContext, useEffect, useState } from "react";
import CartCountBubble from "@/components/CartCountBubble";
import CartPreview from "@/components/CartPreview";
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

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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
            <CenteredNavLink
              href={"/cart"}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <CartIconHeader />
              <CartCountBubble count={cartCount} />
              {isHovered && <CartPreview />}
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
