import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import Link from "next/link";
import styled from "styled-components";

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

export default function CategoriesPage({ products }) {
  // Filter products by gender
  function filterAndSortProducts(products, gender) {
    const filteredProducts = products.filter(
      (product) => product.properties.Gender === gender
    );
    // Sort products by creation date in descending order and get the first 4
    return filteredProducts
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 4);
  }
  const latestMenProducts = filterAndSortProducts(products, "Men");
  const latestWomenProducts = filterAndSortProducts(products, "Women");
  const latestKidsProducts = filterAndSortProducts(products, "Kids");
  return (
    <>
      <PageContainer>
        <Header />
        <ContentWrapper>
          <Center>
            <Title>All Categories</Title>
            <StyledDiv>
              <h2>Men&apos;s Shoes</h2>
              <StyledLink href={"/categories/men"}>Go To Page</StyledLink>
            </StyledDiv>
            <ProductsGrid products={latestMenProducts} />
            <br />
            <br />
            <StyledDiv>
              <h2>Women&apos;s Shoes</h2>
              <StyledLink href={"/categories/women"}>Go To Page</StyledLink>
            </StyledDiv>
            <ProductsGrid products={latestWomenProducts} />
            <br />
            <br />
            <StyledDiv>
              <h2>Kids Shoes</h2>
              <StyledLink href={"/categories/kids"}>Go To Page</StyledLink>
            </StyledDiv>
            <ProductsGrid products={latestKidsProducts} />
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
