import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import {
  Box,
  CityHolder,
  ColumnsWrapper,
  ContentWrapper,
  ErrorDiv,
  FooterWrapper,
  PageContainer,
  ProductImageBox,
  ProductInfoCell,
  ProductTitle,
  QuantityLabel,
  StyledBsCartXFill,
  StyledDiv,
} from "@/components/styles/CartStyles";
import validateForm from "@/utils/validateForm";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useReducer, useState } from "react";
import CancelMessage from "../components/CancelMessage";
import SuccessMessage from "../components/SuccessMessage";

// Define the reducer outside of the component
function formReducer(state, action) {
  // reducer function that will be used to update form state based on action type and payload (value) of action object
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_CITY":
      return { ...state, city: action.payload };
    case "SET_POSTAL_CODE":
      return { ...state, postalCode: action.payload };
    case "SET_STREET_ADDRESS":
      return { ...state, streetAddress: action.payload };
    case "SET_COUNTRY":
      return { ...state, country: action.payload };
    default:
      return state;
  }
}

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext); //get cartProducts, addProduct, removeProduct and clearCart functions from CartContext
  const [products, setProducts] = useState([]); //create products state with empty array as initial value
  const [isSuccess, setIsSuccess] = useState(false); //create isSuccess state with false as initial value
  const [errors, setErrors] = useState({}); //create errors state with empty object as initial value
  const [submitClicked, setSubmitClicked] = useState(false); //create submitClicked state with false as initial value
  const [formState, dispatch] = useReducer(formReducer, {
    //create formState state with empty object as initial value and dispatch function that will be used to update formState
    name: "",
    email: "",
    city: "",
    postalCode: "",
    streetAddress: "",
    country: "",
  });
  const { name, email, city, postalCode, streetAddress, country } = formState; //destructure formState object
  const router = useRouter(); //get router object from useRouter hook
  const { canceled } = router.query; //get canceled query from router object
  const inputFields = [
    //create inputFields array with input fields data
    {
      type: "text",
      placeholder: "Name",
      value: formState.name,
      name: "name",
      onChange: handleNameChange,
      required: true,
    },
    {
      type: "text",
      placeholder: "Email",
      value: formState.email,
      name: "email",
      onChange: handleEmailChange,
      required: true,
    },
    {
      type: "text",
      placeholder: "City",
      value: formState.city,
      name: "city",
      onChange: handleCityChange,
      required: true,
    },
    {
      type: "text",
      placeholder: "Postal Code",
      value: formState.postalCode,
      name: "postalCode",
      onChange: handlePostalCodeChange,
      required: true,
    },
    {
      type: "text",
      placeholder: "Street Address",
      value: formState.streetAddress,
      name: "streetAddress",
      onChange: handleStreetAddressChange,
      required: true,
    },
    {
      type: "text",
      placeholder: "Country",
      value: formState.country,
      name: "country",
      onChange: handleCountryChange,
      required: true,
    },
  ];

  // Use useMemo to calculate the total
  const total = useMemo(() => {
    let total = 0; //calculate total price of all products in cart
    for (const productId of cartProducts) {
      //loop through cartProducts array
      const price = products.find((p) => p._id === productId._id)?.price || 0; //get price of product from products array
      total += price * productId.quantity; //add price of product multiplied by quantity of product to total
    }
    return total; //return total
  }, [cartProducts, products]); //rerun useMemo when cartProducts or products change

  useEffect(() => {
    //useEffect hook to run when submitClicked state changes
    if (submitClicked) {
      //if submit button was clicked
      const validationErrors = validateForm(formState); //validate form fields with validateForm function and get errors object with error messages for each field if not valid or empty if valid (no errors)
      setErrors(validationErrors); //set errors state to validationErrors object
      setSubmitClicked(false); // reset for next submit click
    }
  }, [submitClicked]); //rerun useEffect when submitClicked state changes

  useEffect(() => {
    //useEffect hook to run when cartProducts state changes
    if (cartProducts.length > 0) {
      //if cartProducts array is not empty
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        //send post request to /api/cart endpoint with cartProducts array as ids property of request body and get response with products array
        setProducts(response.data); //set products state to products array
      });
    } else {
      //if cartProducts array is empty
      setProducts([]); //set products state to empty array
    }
  }, [cartProducts]); //rerun useEffect when cartProducts state changes

  useEffect(() => {
    //useEffect hook to run when router object changes
    if (typeof window === "undefined") {
      //if window object is undefined
      return; //return
    }
    if (window?.location.href.includes("success")) {
      //if window location href includes "success"
      setIsSuccess(true); //set isSuccess state to true
      clearCart(); //clear cartProducts array
    }
  }, []); //rerun useEffect when router object changes

  function moreOfThisProduct(productIdAndSize) {
    //function to add product to cartProducts array
    addProduct(productIdAndSize); //add product to cartProducts array
  }
  function lessOfThisProduct(productIdAndSize) {
    //function to remove product from cartProducts array
    removeProduct(productIdAndSize); //remove product from cartProducts array
  }

  async function goToPayment(event) {
    //async function to send post request to /api/checkout endpoint with form data and redirect to payment page
    event.preventDefault(); //prevent default form submit behavior
    try {
      const response = await axios.post("/api/checkout", {
        //send post request to /api/checkout endpoint with form data
        name,
        email,
        city,
        postalCode,
        streetAddress,
        country,
        cartProducts,
      });
      if (response.data.url) {
        //if response data has url property
        window.location = response.data.url; //redirect to url
      }
    } catch (error) {
      //if error
      console.error("Error in goToPayment during checkout:", error); //log error
    }
  }

  function handleNameChange(event) {
    //function to update name state when name input value changes
    dispatch({ type: "SET_NAME", payload: event.target.value });
  }
  function handleEmailChange(event) {
    //function to update email state when email input value changes
    dispatch({ type: "SET_EMAIL", payload: event.target.value });
  }
  function handleCityChange(event) {
    //function to update city state when city input value changes
    dispatch({ type: "SET_CITY", payload: event.target.value });
  }
  function handlePostalCodeChange(event) {
    //function to update postalCode state when postalCode input value changes
    dispatch({ type: "SET_POSTAL_CODE", payload: event.target.value });
  }
  function handleStreetAddressChange(event) {
    //function to update streetAddress state when streetAddress input value changes
    dispatch({ type: "SET_STREET_ADDRESS", payload: event.target.value });
  }
  function handleCountryChange(event) {
    //function to update country state when country input value changes
    dispatch({ type: "SET_COUNTRY", payload: event.target.value });
  }

  function handleSubmit(event) {
    //function to handle form submit
    event.preventDefault(); //prevent default form submit behavior
    setSubmitClicked(true); //set submitClicked state to true

    const errors = validateForm(formState); //validate form fields with validateForm function and get errors object with error messages for each field if not valid or empty if valid (no errors)

    if (Object.keys(errors).length > 0) {
      // There are errors, don't submit the form
      setErrors(errors); //set errors state to errors object
      return;
    } else {
      // No errors, you can submit the form
      goToPayment(event); //send post request to /api/checkout endpoint with form data and redirect to payment page
    }
  }

  if (canceled) {
    //if payment was canceled return cancel message component with canceled prop set to true
    return <CancelMessage canceled={canceled} />; // http://localhost:3001/cart?canceled=1
  }
  if (isSuccess) {
    //if payment was successful return success message component with isSuccess prop set to true
    return <SuccessMessage isSuccess={isSuccess} />; //http://localhost:3001/cart?success=1
  }
  return (
    <>
      <PageContainer>
        <Header />
        <ContentWrapper>
          <Center>
            <ColumnsWrapper>
              <Box>
                <h2>Cart</h2>
                {!cartProducts?.length && (
                  <>
                    <StyledDiv>
                      <div>Your cart is empty</div>
                      <div>
                        <StyledBsCartXFill />
                      </div>
                    </StyledDiv>
                  </>
                )}
                {cartProducts?.length > 0 && (
                  <Table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => {
                        const productSizes = cartProducts.filter(
                          (item) => item._id === product._id
                        );
                        return productSizes.map((item, index) => (
                          <tr key={`${product._id}-${index}`}>
                            <ProductInfoCell>
                              <ProductImageBox>
                                <Link href={`/product/${product._id}`}>
                                  <img src={product.images[0]} alt="" />
                                </Link>
                              </ProductImageBox>
                              <ProductTitle>{product.title}</ProductTitle>
                              <strong>Size: </strong>
                              {item.size}
                              <br />
                              <strong>Color: </strong>
                              {product.properties.Color}
                            </ProductInfoCell>
                            <td>
                              <Button
                                onClick={() =>
                                  lessOfThisProduct({
                                    _id: product._id,
                                    size: item.size,
                                  })
                                }
                              >
                                -
                              </Button>
                              <QuantityLabel>
                                <p>{item.quantity}</p>
                              </QuantityLabel>
                              <Button
                                onClick={() =>
                                  moreOfThisProduct({
                                    _id: product._id,
                                    size: item.size,
                                  })
                                }
                              >
                                +
                              </Button>
                            </td>
                            <td>
                              $
                              {productSizes.filter(
                                (size) => size.size === item.size
                              ).length *
                                product.price *
                                item.quantity}
                            </td>
                          </tr>
                        ));
                      })}
                      <tr>
                        <td></td>
                        <td></td>
                        <td>${total}</td>
                      </tr>
                    </tbody>
                  </Table>
                )}
              </Box>
              {!!cartProducts?.length && (
                <Box>
                  <h2>Order information</h2>
                  <form onSubmit={handleSubmit}>
                    {inputFields.map((field, index) => (
                      <>
                        {index === 2 && (
                          <CityHolder>
                            <Input
                              key={index}
                              type={field.type}
                              placeholder={field.placeholder}
                              value={field.value}
                              name={field.name}
                              onChange={field.onChange}
                              required={field.required}
                            />
                            <Input
                              key={index + 1}
                              type={inputFields[index + 1].type}
                              placeholder={inputFields[index + 1].placeholder}
                              value={inputFields[index + 1].value}
                              name={inputFields[index + 1].name}
                              onChange={inputFields[index + 1].onChange}
                              required={inputFields[index + 1].required}
                            />
                          </CityHolder>
                        )}
                        {index !== 2 && index !== 3 && (
                          <Input
                            key={index}
                            type={field.type}
                            placeholder={field.placeholder}
                            value={field.value}
                            name={field.name}
                            onChange={field.onChange}
                            required={field.required}
                          />
                        )}
                      </>
                    ))}

                    <Button black block type="submit">
                      Continue to payment
                    </Button>

                    {Object.keys(errors).map((field) => (
                      <ErrorDiv key={field}>{errors[field]}</ErrorDiv>
                    ))}
                  </form>
                </Box>
              )}
            </ColumnsWrapper>
          </Center>
        </ContentWrapper>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </PageContainer>
    </>
  );
}
