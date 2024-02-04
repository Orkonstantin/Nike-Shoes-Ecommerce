import Featured from "@/components/Featured";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";

export default function HomePage({ featuredProduct, newProducts }) {
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

  return (
    <div>
      <PageContainer>
        <Header />
        <ContentWrapper>
          <Featured product={featuredProduct} />
          <NewProducts products={newProducts} />
        </ContentWrapper>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </PageContainer>
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "65a6cd7db0b43310cf655e21";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
