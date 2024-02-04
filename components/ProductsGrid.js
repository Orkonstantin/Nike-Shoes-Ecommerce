import styled from "styled-components";
import ProductBox from "@/components/ProductBox";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  // @media screen and (max-width: 515px) {
  //   &.long-title {
  //     grid-template-columns: 1fr;
  //   }
  // }
  // @media screen and (min-width: 768px) {
  //   grid-template-columns: 1fr 1fr 1fr;
  // }
  @media screen and (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export default function ProductsGrid({ products }) {
  const isLongTitle = products?.some((product) => product.title.length >= 20);

  return (
    <StyledProductsGrid className={isLongTitle ? "long-title" : ""}>
      {products?.length > 0 &&
        products.map((product) => (
          <ProductBox key={product._id} {...product} />
        ))}
    </StyledProductsGrid>
  );
}
