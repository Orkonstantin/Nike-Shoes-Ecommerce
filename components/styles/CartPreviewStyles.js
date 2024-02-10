import styled from "styled-components";

export const CartPreviewContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 100%;
  right: 100;
  max-width: 300px;
  min-width: 200px;
  width: 100%;
  height: auto;
  background-color: #fff;
  color: #000;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  z-index: 1;
  cursor: default;
`;

export const StyledProductPreview = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 2px;
`;

export const ImageContainer = styled.div`
  width: 50%;
`;

export const StyledImage = styled.img`
  width: 100%;
  height: auto;
`;

export const DetailsContainer = styled.div`
  flex-grow: 1;
  padding: 10px;
  text-align: left;
  font-size: 14px;
  line-height: 1.5;
  color: #000;
`;
