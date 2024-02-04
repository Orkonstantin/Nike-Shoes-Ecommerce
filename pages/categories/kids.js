import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Footer from "@/components/Footer";
import Link from "next/link";
import styled from "styled-components";
import Header from "@/components/Header";
import Center from "@/components/Center";
import Title from "@/components/Title";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const StyledLink = styled(Link)`
  color: gray;
`;

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

export default function KidsPage({ products }) {
  // Filter products by gender (kids)
  const kidsProducts = products.filter(
    (product) => product.properties.Gender === "Kids"
  );

  // Group products by category
  const productsByCategory = kidsProducts.reduce((acc, product) => {
    (acc[product.categoryName] = acc[product.categoryName] || []).push(product);
    return acc;
  }, {});

  const url = "/categories/kids/";

  return (
    <>
      <PageContainer>
        <Header />
        <ContentWrapper>
          <Center>
            <Title>Kids Shoes</Title>
            {Object.entries(productsByCategory).map(
              ([categoryName, products]) => (
                <>
                  <StyledDiv>
                    <h2>{categoryName}</h2>
                    <StyledLink href={url + categoryName}>Show all</StyledLink>
                  </StyledDiv>
                  <ProductsGrid products={products} />
                </>
              )
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

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { category } = context.query;
  const products = category
    ? await Product.find({ category }, null, { sort: { _id: -1 } })
    : await Product.find({}, null, { sort: { _id: -1 } });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
