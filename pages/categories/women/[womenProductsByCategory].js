import Header from "@/components/Header";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Footer from "@/components/Footer";
import styled from "styled-components";
import { useRouter } from "next/router";
import Title from "@/components/Title";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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

export default function WomenProductsByCategoryPage({ products }) {
  // Filter products by gender (Women)
  const womenProducts = products.filter(
    (product) => product.properties.Gender === "Women"
  );

  // Group products by category
  const productsByCategory = womenProducts.reduce((acc, product) => {
    (acc[product.categoryName] = acc[product.categoryName] || []).push(product);
    return acc;
  }, {});

  const router = useRouter();
  const selectedCategory = router.query.womenProductsByCategory;

  return (
    <>
      <PageContainer>
        <Header />
        <ContentWrapper>
          <Center>
            <Title>Women's {selectedCategory} Shoes</Title>
            {Object.entries(productsByCategory).map(
              ([categoryName, products]) =>
                categoryName === selectedCategory && (
                  <>
                    <StyledDiv>
                      <h2>{categoryName}</h2>
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
