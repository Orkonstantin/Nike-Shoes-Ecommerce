import styled from "styled-components";
import Button from "@/components/Button";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "@/components/CartContext";

const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px 10px;
  height: 120px;
  // height: 200px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 150px;
    // max-height: 450px;
    border-radius: 10px;
  }
  background-color: #f5f5f5;
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: block;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 600;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    text-align: left;
  }
`;
const StyledA = styled.a`
  text-decoration: none;
  color: inherit;
  width: 100%;
`;
const TitleDiv = styled.div`
  height: 50px;
`;

export default function ProductBox({ _id, title, description, price, images }) {
  const { addProduct } = useContext(CartContext);
  const url = "/product/" + _id;
  //

  const [currentImage, setCurrentImage] = useState(images?.[0]);
  const [imageInterval, setImageInterval] = useState(null);

  useEffect(() => {
    return () => {
      // Clean up the interval on component unmount
      if (imageInterval) clearInterval(imageInterval);
    };
  }, [imageInterval]);

  const startImageSwap = () => {
    let imageIndex = 0;
    setImageInterval(
      setInterval(() => {
        imageIndex = (imageIndex + 1) % images.length;
        setCurrentImage(images[imageIndex]);
      }, 1000)
    );
  };

  const stopImageSwap = () => {
    // Stop the image swap
    if (imageInterval) clearInterval(imageInterval); // Clear the interval
    setImageInterval(null); // Reset the interval
    setCurrentImage(images?.[0]); // Reset to the first image
  };

  return (
    <ProductWrapper>
      {/* This is the wrapper for the product box */}
      <WhiteBox
        href={url} // This is the link to the product page
        onMouseEnter={startImageSwap} // Start the image swap on mouse enter
        onMouseLeave={stopImageSwap} // Stop the image swap on mouse leave
      >
        <div>
          <img src={currentImage} alt="" /> {/* Display the current image */}
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <TitleDiv>
          <Title href={url}>{title}</Title>
        </TitleDiv>

        <PriceRow>
          <Price>${price}</Price>
          <StyledA href={url}>
            <Button block primary outline>
              Shop Now
            </Button>
          </StyledA>
          {/* <Button block onClick={() => addProduct(_id)} primary outline>
            Add to cart
          </Button> */}
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
