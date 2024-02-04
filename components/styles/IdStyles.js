import styled, { keyframes } from "styled-components";

export const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;

export const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const Price = styled.span`
  font-size: 1.4rem;
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const ContentWrapper = styled.div`
  flex: 1 0 auto;
`;

export const FooterWrapper = styled.div`
  flex-shrink: 0;
`;

export const SizeSelect = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const SizeRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin: 20px 0;
`;

export const moveToCart = keyframes`
  0% {
    transform: translate(0, 0);
    opacity: 1;
  }
  100% {
    transform: translate(20vw, -70vh);
    opacity: 0;
  }
`;

export const moveToCartSmallScreen = keyframes`
  0% {
    transform: translate(0, 0);
    opacity: 1;
  }
  100% {
    transform: translate(30vw, -80vh);
    opacity: 0;
  }
`;

export const moveToCartBigScreen = keyframes`
  0% {
    transform: translate(0, 0);
    opacity: 1;
  }
  100% {
    transform: translate(20vw, -70vh);
    opacity: 0;
  }
`;
