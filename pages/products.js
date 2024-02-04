import Header from "../components/Header";
import Center from "../components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";

import styled from "styled-components";
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1 0 auto;
`;

const FooterWrapper = styled.div`
  flex-shrink: 0;
`;

const StyledButton = styled.button`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  background-color: darkgray;
  color: black;
`;

const ShowMoreDiv = styled.div`
  text-align: center;
  margin: 40px 0 10px 0;
`;

export default function ProductsPage({ products }) {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [productIndex, setProductIndex] = useState(8);
  useEffect(() => {
    setDisplayedProducts(products.slice(0, 8));
  }, [products]);

  const showMoreProducts = () => {
    setProductIndex((prevIndex) => prevIndex + 8);
    setDisplayedProducts(products.slice(0, productIndex + 8));
  };
  return (
    <>
      <PageContainer>
        <Header />
        <ContentWrapper>
          <Center>
            <Title>All Products</Title>
            <ProductsGrid products={displayedProducts} />
            {products.length > displayedProducts.length && (
              <ShowMoreDiv>
                <StyledButton onClick={showMoreProducts}>
                  Show more
                </StyledButton>
              </ShowMoreDiv>
            )}
          </Center>
        </ContentWrapper>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </PageContainer>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
