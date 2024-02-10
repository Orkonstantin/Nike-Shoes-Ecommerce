import { useContext, useEffect, useState, useMemo } from "react";
import { CartContext } from "./CartContext";
import axios from "axios";
import Link from "next/link";
import {
  CartPreviewContainer,
  StyledProductPreview,
  ImageContainer,
  StyledImage,
  DetailsContainer,
} from "./styles/CartPreviewStyles";

export default function CartPreview() {
  const { cartProducts } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  // Use useMemo to calculate the total
  const total = useMemo(() => {
    let total = 0;
    for (const productId of cartProducts) {
      const price = products.find((p) => p._id === productId._id)?.price || 0;
      total += price * productId.quantity;
    }
    return total;
  }, [cartProducts, products]);

  if (cartProducts.length === 0) {
    return <CartPreviewContainer>The cart is empty</CartPreviewContainer>;
  }

  return (
    <CartPreviewContainer>
      {products.map((product) => {
        const productSizes = cartProducts.filter(
          (item) => item._id === product._id
        );
        return productSizes.map((item, index) => (
          <StyledProductPreview key={`${product._id}-${index}`}>
            <ImageContainer>
              <Link href={`/product/${product._id}`}>
                <StyledImage src={product.images[0]} alt="" />
              </Link>
            </ImageContainer>
            <DetailsContainer>
              <div>{product.title}</div>
              <strong>Size: </strong>
              {item.size}
              <br />
              <strong>Quantity: </strong>
              {item.quantity}
              <br />
              <strong>Price: </strong>${" "}
              {productSizes.filter((size) => size.size === item.size).length *
                product.price *
                item.quantity}
            </DetailsContainer>
          </StyledProductPreview>
        ));
      })}
      <div>
        <strong>Total: </strong>${total}
      </div>
    </CartPreviewContainer>
  );
}
