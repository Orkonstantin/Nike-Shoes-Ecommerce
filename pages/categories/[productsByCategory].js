import Header from "../../components/Header";
import Center from "../../components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Footer from "@/components/Footer";
import styled from "styled-components";
import { useRouter } from "next/router";

export default function ProductsByCategoryPage({ products }) {
  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    (acc[product.categoryName] = acc[product.categoryName] || []).push(product);
    return acc;
  }, {});

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

  const router = useRouter();
  const selectedCategory = router.query.productsByCategory;

  return (
    <>
      <PageContainer>
        <Header />
        <ContentWrapper>
          <Center>
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
