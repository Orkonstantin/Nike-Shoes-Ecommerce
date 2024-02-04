import Center from "./Center";
import Header from "./Header";
import { Box, ColumnsWrapper } from "./styles/CartStyles";

export default function SuccessMessage({ isSuccess }) {
  // function component with isSuccess prop that will be true if payment was successful
  if (!isSuccess) {
    //if payment was not successful return null
    return null;
  }

  return (
    // if payment was successful return success message
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h1>Thanks for your order!</h1>
            <p>We will email you when your order will be sent.</p>
          </Box>
        </ColumnsWrapper>
      </Center>
    </>
  );
}
