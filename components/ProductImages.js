import styled from "styled-components";
import { useState } from "react";

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  //
  border-radius: 5px;
`;
const BigImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  //
  border-radius: 25px;
`;
const ImageButtons = styled.div`
  gap: 10px;
  flex-grow: 0;
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
`;
const ImageButton = styled.div`
  flex: 1 0 calc(27% - 1px); // 25% for 4 items per row, 10px for the gap
  text-align: center;
  border: 2px solid #ccc;
  ${(props) =>
    props.active
      ? `
      border-color: #ccc;
    `
      : `
      border-color: transparent;
    `}
  height: 40px;
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;
`;
const BigImageWrapper = styled.div`
  text-align: center;
`;

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage} />
      </BigImageWrapper>
      <ImageButtons>
        {images.map((image) => (
          <ImageButton
            key={image}
            active={image === activeImage}
            onClick={() => setActiveImage(image)}
          >
            <Image src={image} alt="" />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
}
