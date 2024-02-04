import styled from "styled-components";
import { BsCartXFill } from "react-icons/bs";

export const StyledBsCartXFill = styled(BsCartXFill)`
  font-size: 25px;
  text-align: center;
  justify-content: center;
  display: flex;
  align-items: center;
`;

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  gap: 10px;
  background-color: #fff;
  border-radius: 10px;
`;

export const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

export const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

export const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

export const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 5px 5px 0px 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  img {
    border-radius: 20px;
    max-width: 100%;
    max-height: 100%;
  }
  @media screen and (min-width: 768px) {
    padding: 20px 5px 15px 5px;
    width: 100px;
    height: 100px;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
`;

export const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

export const CityHolder = styled.div`
  display: flex;
  gap: 5px;
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

export const ProductTitle = styled.div`
  width: 15ch;
  white-space: pre-wrap;
  word-wrap: break-word;
  margin-top: 10px;
  font-weight: 600;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 4px;
`;

export const ErrorDiv = styled.div`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: #ff0000;
  padding: 4px;
  margin-bottom: 10px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.8rem;
  margin-top: 10px;
`;
