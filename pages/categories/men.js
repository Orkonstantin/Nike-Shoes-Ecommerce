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

export default function MenPage({ products }) {
  // Filter products by gender (Men)
  const menProducts = products.filter(
    (product) => product.properties.Gender === "Men"
  );

  // Group products by category
  const productsByCategory = menProducts.reduce((acc, product) => {
    (acc[product.categoryName] = acc[product.categoryName] || []).push(product);
    return acc;
  }, {});

  // Sort categories in ascending order
  const sortedCategories = Object.entries(productsByCategory).sort((a, b) =>
    a[0].localeCompare(b[0])
  );
  const url = "/categories/men/";

  return (
    <>
      <PageContainer>
        <Header />
        <ContentWrapper>
          <Center>
            <Title>Men's Shoes</Title>
            {sortedCategories.map(([categoryName, products]) => (
              <>
                <StyledDiv>
                  <h2>{categoryName}</h2>
                  <StyledLink href={url + categoryName}>Show all</StyledLink>
                </StyledDiv>
                <ProductsGrid products={products.slice(0, 4)} />
              </>
            ))}
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
