import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import CartIcon from "@/components/icons/CartIcon";
import {
  ColWrapper,
  ContentWrapper,
  FooterWrapper,
  PageContainer,
  Price,
  PriceRow,
  SizeRow,
  SizeSelect,
  moveToCartBigScreen,
  moveToCartSmallScreen,
} from "@/components/styles/IdStyles";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);
  const [animate, setAnimate] = useState(false);
  const Sizes = product.properties.Size.split(" ").map((size) =>
    size.replace(/([a-zA-Z])(\d)/g, "$1 $2")
  );
  const [selectedSize, setSelectedSize] = useState(Sizes[0]); // initialize with the first size

  const [windowWidth, setWindowWidth] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 0 ? window.innerWidth : 0;
    }
    return 0;
  });
  const AnimatedButton = styled(Button)`
    &.animate {
      animation: ${(props) =>
          props.windowWidth >= 768
            ? moveToCartBigScreen
            : moveToCartSmallScreen}
        1s forwards;
    }
  `;
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    // console.log(windowWidth);
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);
  return (
    <>
      <PageContainer>
        <Header />
        <ContentWrapper>
          <Center>
            <ColWrapper>
              <WhiteBox>
                <ProductImages images={product.images} />
              </WhiteBox>
              <div>
                <Title>{product.title}</Title>
                <p>{product.description}</p>
                <p>
                  {" "}
                  <strong>Color: </strong>
                  {product.properties.Color}
                </p>
                <p>
                  {" "}
                  {product.properties.Model && (
                    <>
                      <strong>Model: </strong>
                      {product.properties.Model}
                    </>
                  )}
                </p>
                <SizeRow>
                  <strong>Select Size</strong>
                  <SizeSelect
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    {Sizes.map((size, index) => (
                      <option key={index} value={size}>
                        {size}
                      </option>
                    ))}
                  </SizeSelect>
                </SizeRow>
                <PriceRow>
                  <div>
                    <Price>${product.price}</Price>
                  </div>
                  <div>
                    <AnimatedButton
                      primary
                      onClick={() => {
                        addProduct({ _id: product._id, size: selectedSize });
                        if (windowWidth > 768) {
                          setAnimate(true);
                        }
                      }}
                      onAnimationEnd={() => setAnimate(false)}
                      className={animate && windowWidth > 768 ? "animate" : ""}
                    >
                      <CartIcon />
                      Add to cart
                    </AnimatedButton>
                  </div>
                </PriceRow>
              </div>
            </ColWrapper>
          </Center>
        </ContentWrapper>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </PageContainer>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
